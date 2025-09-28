import { useCart } from "../../hooks/useCart";
import styled from "styled-components";
import { IconCart } from "../icons/cart";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { RoleDTO } from "@/types/dto/user/roleDTO";

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
  const { cart } = useCart();
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/cart");
  };

  return (
    cart && (
      <DivContainer onClick={handleNavigate}>
        <IconCart />
        {cart.totalItems > 0 && (
          <CartCountItems>{cart.totalItems}</CartCountItems>
        )}
      </DivContainer>
    )
  );
};
