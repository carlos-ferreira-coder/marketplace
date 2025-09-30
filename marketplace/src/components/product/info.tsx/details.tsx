"use client";

import { Button } from "@/components/button";
import { IconCart } from "@/components/icons/cart";
import { useAuth } from "@/hooks/useAuth";
import { useCartMutation } from "@/hooks/useCart";
import { ProductResponseDTO } from "@/types/dto/product/productResponseDTO";
import { numberToBrl } from "@/utils/numberToBrl";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

/*
const Type = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: var(--text-dark-2);
`;
*/

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
  const router = useRouter();
  const { role } = useAuth();
  const { cartAddProduct } = useCartMutation();

  const handleCartAddProduct = () => {
    cartAddProduct({
      productId: product.id,
      quantity: 1,
    });
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

      {role === "ADMIN" ? (
        <div>
          <Button
            background="info"
            textTransform={"uppercase"}
            onClick={() => router.push(`/product/update/${product.id}`)}
            style={{ marginTop: "35px" }}
          >
            <FontAwesomeIcon icon={faPen} />
            Editar produto
          </Button>
          <Button
            background="delete"
            textTransform={"uppercase"}
            onClick={() => router.push(`/product/delete/${product.id}`)}
            style={{ marginTop: "20px" }}
          >
            <FontAwesomeIcon icon={faTrash} />
            Excluir produto
          </Button>
        </div>
      ) : (
        <Button
          background="info"
          textTransform={"uppercase"}
          onClick={handleCartAddProduct}
          style={{ marginTop: "35px" }}
        >
          <IconCart />
          Adicionar ao carrinho
        </Button>
      )}
    </DivContainer>
  );
};
