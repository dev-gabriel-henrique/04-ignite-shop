import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  defaultPriceId: string;
}

export default function Product({
  description,
  id,
  imageUrl,
  name,
  price,
  defaultPriceId,
}: ProductProps) {
  const { shouldDisplayCart, addItem } = useShoppingCart();

  const handleAddItem = () => {
    addItem({
      id: id,
      name: name,
      image: imageUrl,
      sku: defaultPriceId,
      currency: "BRL",
      price: price,
    });
  };

  return (
    <>
      <Head>
        <title>{name} | Ignite Shop</title>
      </Head>
      <ProductContainer
        style={{
          transform: shouldDisplayCart ? "translateX(-30rem)" : "translateX(0)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <ImageContainer>
          <Image src={imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{name}</h1>
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(price)}
          </span>

          <p>{description}</p>

          <button onClick={handleAddItem}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_RmndvbAJtDhgcC" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: (price.unit_amount ?? 0) / 100,
      description: product.description,
      defaultPriceId: price.id,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
