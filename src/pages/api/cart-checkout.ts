import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

interface CartItem {
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export default async function handleCheckoutSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items }: { items: CartItem[] } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "No items in the cart." });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_URL}`,
    line_items: items.map((item) => ({
      price_data: {
        currency: "BRL",
        product_data: {
          name: item.name,
          images: [item.imageUrl],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
