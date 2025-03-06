import {
  AsideContainer,
  FooterContainer,
  ItemsContainer,
  PriceContainer,
} from "@/styles/pages/cart";
import { X } from "@phosphor-icons/react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { useShoppingCart } from "use-shopping-cart";

export function CartAside() {
  const {
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    cartCount,
    totalPrice,
    setItemQuantity,
    clearCart,
  } = useShoppingCart();

  const handleCheckout = async () => {
    if (!cartCount) {
      toast.error("Seu carrinho está vazio.");
      return;
    }

    try {
      const response = await axios.post("/api/cart-checkout", {
        items: Object.values(cartDetails!),
      });

      const { checkoutUrl } = response.data;

      clearCart();
      window.location.href = checkoutUrl;
    } catch (error) {
      toast.error("Erro ao redirecionar ao checkout:");
      console.log(error);
    }
  };

  return (
    <AsideContainer open={shouldDisplayCart}>
      <button onClick={handleCartClick}>
        <X size={24} />
      </button>
      <h2>Sacola de Compras</h2>

      <ItemsContainer>
        {Object.values(cartDetails ?? {}).map((item, index) => (
          <div key={index}>
            <Image
              src={item?.imageUrl ?? ""}
              width={100}
              height={100}
              alt={item?.name}
            />
            <div>
              <p>{item?.name}</p>
              <p>
                <strong>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item?.price)}
                </strong>
                <span>
                  <small> x{item.quantity}</small>
                </span>
              </p>
              <button
                onClick={() => {
                  setItemQuantity(item?.id, item?.quantity - 1);

                  toast.success(`${item.name} removida do carrinho`);
                }}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </ItemsContainer>

      <FooterContainer>
        <PriceContainer>
          <div>
            <small>Quantidade</small>
            <p>{cartCount} itens</p>
          </div>

          <div>
            <p>
              <strong>Valor Total</strong>
            </p>
            <h6>
              {totalPrice
                ? new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalPrice)
                : "R$ 0,00"}
            </h6>
          </div>
        </PriceContainer>

        <button onClick={handleCheckout}>Finalizar compra</button>
      </FooterContainer>
    </AsideContainer>
  );
}
