import { useCart } from "../../hooks/useCart";
import styled from "styled-components";
import { IconCart } from "../icons/cartSvg";

const DivContainer = styled.div`
  position: relative;
  cursor: pointer;
  border: none;
  background: transparent;
`;

const CartCountItems = styled.span`
  width: 17px;
  height: 17px;
  border-radius: 100%;
  padding: 0 5px;
  font-size: 10px;

  background-color: var(--delete-color);
  color: white;

  margin-left: -10px;
`;

export const CartControl = () => {
  const { cart } = useCart();

  return (
    <DivContainer>
      <IconCart />
      {cart && <CartCountItems>{cart.quantity}</CartCountItems>}
    </DivContainer>
  );
};
