import "@supabase/functions-js/edge-runtime.d.ts";

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const { error } = await supabase.from("orders").insert({
        stripe_event_id: event.id,
        stripe_session_id: session.id,
        email: session.customer_details?.email,
        price: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        status: "paid"
      });

      if (error) {
        // Postgres unique violation
        if (error.code === "23505") {
          console.log("Duplicate webhook event ignored");
          return new Response("Already processed", { status: 200 });
        }

        console.error("DB insert error:", error);
        return new Response("Database error", { status: 500 });
      }

      console.log("Order recorded successfully");
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new Response("Server error", { status: 500 });
  }
});
