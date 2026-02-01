import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2022-11-15" });

interface CartItem {
  id: string;
  title: string;
  price: number;
}

Deno.serve(async (req: Request) => {
  const { items }: { items: CartItem[] } = await req.json();
  const origin = req.headers.get("origin") ?? "https://yourdomain.com";

  if (!items || !items.length) {
    return new Response(JSON.stringify({ error: "Cart is empty" }), { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((i) => ({
      price_data: {
        currency: "usd",
        product_data: { name: i.title },
        unit_amount: i.price * 100
      },
      quantity: 1
    })),
    mode: "payment",
    success_url: `${origin}/success`,
    cancel_url: `${origin}/cart`
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "Content-Type": "application/json" }
  });
});
