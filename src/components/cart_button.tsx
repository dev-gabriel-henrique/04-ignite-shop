import { useShoppingCart } from "use-shopping-cart";
import { Bag } from "@phosphor-icons/react";
import { CartButtonContainer, ItemCount } from "@/styles/pages/cart"

export default function CartButton() {
  const { handleCartClick, cartCount } = useShoppingCart();

  return (
    <CartButtonContainer onClick={handleCartClick}>
      <Bag size={24} weight="bold" />
      {cartCount! > 0 && <ItemCount>{cartCount}</ItemCount>}
    </CartButtonContainer>
  );
}
