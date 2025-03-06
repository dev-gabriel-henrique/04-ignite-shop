import { ReactNode } from "react";
import { CartProvider as Provider } from "use-shopping-cart";

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  return (
    <Provider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_STRIPE_PUBLIC_KEY ?? ""}
      successUrl={`${process.env.NEXT_PUBLIC_NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
      cancelUrl={process.env.NEXT_PUBLIC_NEXT_URL ?? ""}
      currency="BRL"
      billingAddressCollection={true}
      shouldPersist={true}
      language="pt-BR"
    >
      {children}
    </Provider>
  );
}
