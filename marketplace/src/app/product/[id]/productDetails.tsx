import { IconCart } from "@/components/icons/cart";
import { useAuth } from "@/hooks/useAuth";
import { useCartMutation } from "@/hooks/useCart";
import { CartAddProductRequestDTO } from "@/types/dto/cart/cartAddProductRequestDTO";
import { ProductResponseDTO } from "@/types/dto/product/productResponseDTO";
import { RoleDTO } from "@/types/dto/user/roleDTO";
import { numberToBrl } from "@/utils/numberToBrl";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface ProductDetailsProps {
  product: ProductResponseDTO;
}

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
    height: 100vh;
  }
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  margin-top: 35px;

  background: #115d8c;
  mix-blend-mode: multiply;
  border-radius: 4px;
  border: none;
  padding: 10px 0;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  text-transform: uppercase;

  color: white;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;

  h2 {
    font-weight: 300;
    font-size: 32px;
    line-height: 150%;
    color: var(--text-dark-2);
  }

  p {
    font-weight: 400;
    font-size: 12px;
    color: var(--text-dark);

    margin-top: 17px;

    @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
      margin-top: 20px;
    }
  }
`;

const Type = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: var(--text-dark-2);
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 20px;
  color: var(--shapes-dark);

  margin-top: 5px;

  @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
    margin-top: 12px;
  }
`;

const ProductDescription = styled.div`
  h3 {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    text-transform: uppercase;

    color: var(--text-dark);
  }

  p {
    margin-top: 12px;

    font-weight: 400;
    font-size: 14px;
    line-height: 150%;

    color: var(--text-dark);
  }

  margin-top: 40px;

  @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
    margin-top: 50px;
  }
`;

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const user = useAuth();
  const router = useRouter();
  const { cartAddProduct } = useCartMutation();

  const handleCartAddProduct = () => {
    const cartAddProductData: CartAddProductRequestDTO = {
      productId: product.id,
      quantity: 1,
    };

    cartAddProduct(cartAddProductData);

    const msg = new URLSearchParams(`${product.name} inserido(a) no carrinho!`);
    router.push(`/cart?success-msg=${msg}`);
  };

  return (
    <DivContainer>
      <ProductInfo>
        {/*
          TODO <Type>{product.type}</Type>
        */}
        <h2>{product.name}</h2>
        <Price>{numberToBrl(product.price)}</Price>
        <p>
          *Frete de R$40,00 para todo o Brasil. Grátis para compras acima de
          R$900,00.
        </p>

        <ProductDescription>
          <h3>Descrição</h3>
          <p>{product.description}</p>
        </ProductDescription>
      </ProductInfo>

      <Btn
        onClick={handleCartAddProduct}
        disabled={user.role === RoleDTO.ADMIN}
      >
        <IconCart />
        Adicionar ao carrinho
      </Btn>
    </DivContainer>
  );
};
