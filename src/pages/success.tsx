import { stripe } from "@/lib/stripe";
import {
  ImageItemContainer,
  ImageListContainer,
  SuccessContainer,
} from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface SuccessProps {
  customerName: string;
  productImages: string[];
  totalQuantity: number;
}

export default function Success({
  customerName,
  productImages,
  totalQuantity,
}: SuccessProps) {
  const { shouldDisplayCart } = useShoppingCart();
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer
        style={{
          transform: shouldDisplayCart ? "translateX(-30rem)" : "translateX(0)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <h1>Compra efetuada!</h1>

        <ImageListContainer>
          {productImages.map((imageUrl, index) => (
            <ImageItemContainer key={index}>
              <Image src={imageUrl} alt="" width={100} height={100} />
            </ImageItemContainer>
          ))}
        </ImageListContainer>

        <p>
          Uhuul! <strong>{customerName}</strong>, sua compra de {totalQuantity}{" "}
          {totalQuantity === 1 ? "camiseta" : "camisetas"} já esta a caminho de
          sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;

  const productImages = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product;

    return product.images[0];
  });

  const totalQuantity = session.line_items?.data.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return {
    props: {
      customerName,
      productImages,
      totalQuantity,
    },
  };
};
