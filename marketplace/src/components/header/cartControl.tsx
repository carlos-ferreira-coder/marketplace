import { iconBagShopping } from "../fontAwesome";
import { useCart } from "../../hooks/useCart";
import styled from "styled-components";

const CartCountItems = styled.span`
  width: 17px;
  height: 17px;
  padding: 0px 5px;
  border-radius: 50%;

  font-size: 13px;
  color: white;
  background-color: var(--delete-color);

  margin-left: -10px;
`;

const DivContainer = styled.div`
  position: relative;

  svg {
    width: 25px;
    height: 25px;
    color: var(--text-dark);
  }
`;

export const CartControl = () => {
  const { cart } = useCart();

  return (
    <DivContainer>
      {iconBagShopping}
      {cart && <CartCountItems>{cart.quantity}</CartCountItems>}
    </DivContainer>
  );
};
