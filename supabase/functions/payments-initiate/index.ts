import "@supabase/functions-js/edge-runtime.d.ts";

import {
  buildMetadataItems,
  validateCartPrices,
  CartItem
} from "./helper.ts";

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const body = await req.json();
    const items: CartItem[] = body?.items || [];

    if (!items.length) {
      return new Response("Cart empty", { status: 400 });
    }

    const origin = req.headers.get("origin") || "https://yourdomain.com";

    // Backend Price Validation
    const productIds = items.map((i) => i.id);

    const { data: products, error: productError } = await supabase
      .from("products")
      .select("id, title, price")
      .in("id", productIds);

    if (productError || !products) {
      return new Response("Product lookup failed", { status: 500 });
    }

    // Build trusted price map
    const priceMap = new Map(products.map((p) => [p.id, p.price]));

    // Validate cart pricing
    const validatedItems = items.map((item) => {
      const dbPrice = priceMap.get(item.id);

      if (!dbPrice || dbPrice !== item.price) {
        throw new Error("Cart price validation failed");
      }

      return {
        product_id: item.id,
        title: item.title,
        price: dbPrice,
        quantity: 1
      };
    });

    // --------------------------------------------------
    // Metadata pipeline safety
    // --------------------------------------------------

    const metadataToken = crypto.randomUUID();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: validatedItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title
          },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
      })),

      mode: "payment",

      metadata: {
        token: metadataToken,
        items: JSON.stringify(validatedItems)
      },

      success_url: `${origin}/success?token=${metadataToken}`,
      cancel_url: `${origin}/cart`
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("payments-initiate v2 error:", err);

    return new Response(JSON.stringify({ error: "Checkout creation failed" }), { status: 500 });
  }
});
