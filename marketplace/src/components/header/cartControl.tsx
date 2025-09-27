import { useCart } from "../../hooks/useCart";
import styled from "styled-components";
import { IconCart } from "../icons/cart";

const DivContainer = styled.div`
  position: relative;
  cursor: pointer;
  border: none;
  background: transparent;
  top: 3px;

  color: var(--text-dark);
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
  const { data: cart } = useCart();

  return (
    <DivContainer>
      <IconCart />
      {cart?.items && cart?.items.length > 0 && (
        <CartCountItems>{cart.items.length}</CartCountItems>
      )}
    </DivContainer>
  );
};
