import Stripe from "stripe";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { styled } from "@/styles";
import { stripe } from "@/lib/stripe";
import { HomeContainer, Product } from "@/styles/pages/home";

import "keen-slider/keen-slider.min.css";
import { GetStaticProps } from "next";
import { useKeenSlider } from "keen-slider/react";
import { useShoppingCart } from "use-shopping-cart";
import { Bag } from "@phosphor-icons/react/dist/ssr";
import { toast } from "react-toastify";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    sku: string;
    currency: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const { addItem, shouldDisplayCart } = useShoppingCart();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer
        ref={sliderRef}
        className="keen-slider"
        style={{
          transform: shouldDisplayCart ? "translateX(-30rem)" : "translateX(0)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {products?.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={520}
                  alt={product.name}
                  style={{ objectFit: "cover" }}
                  priority={true}
                />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product?.price)}
                    </span>
                  </div>

                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      addItem(product);
                      toast.success(`${product.name} adicionado ao carrinho`);
                    }}
                  >
                    <Bag size={32} />
                  </button>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: (price.unit_amount ?? 0) / 100,
      sku: price.id,
      currency: price.currency,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
