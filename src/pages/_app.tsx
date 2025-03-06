import type { AppProps } from "next/app";
import { globalStyles } from "@/styles/global";
import Image from "next/image";

import logoImg from "@/assets/logo.svg";
import { Container, Header } from "@/styles/pages/app";
import CartProvider from "@/provider/cart-provider";
import { CartAside } from "@/components/cart_aside";
import CartButton from "@/components/cart_button";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImg} width={130} height={52} alt="Logo ignite" />
          </Link>

          <CartButton />
        </Header>
        <Component {...pageProps} />
        <ToastContainer />
        <CartAside />
      </Container>
    </CartProvider>
  );
}
