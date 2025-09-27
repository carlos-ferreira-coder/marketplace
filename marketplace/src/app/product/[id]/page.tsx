"use client";

import { BackBtn } from "@/components/backButton";
import { DefaultLayout } from "@/components/default/defaultLayout";
import { IconCart } from "@/components/icons/cart";
import { IconLoader, Loader } from "@/components/loader";
import { useProduct } from "@/hooks/useProduct";
import { numberToBrl } from "@/utils/numberToBrl";
import { useParams } from "next/navigation";
import styled from "styled-components";

const DivContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  section {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 32px;
    margin-top: 24px;

    img {
      max-width: 640px;
      width: 50%;
    }

    > div {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      button {
        background: #115d8c;
        mix-blend-mode: multiply;
        border-radius: 4px;
        color: white;
        border: none;
        cursor: pointer;
        padding: 10px 0;
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        text-transform: uppercase;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
    }
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: var(--text-dark-2);
  }

  h2 {
    font-weight: 300;
    font-size: 32px;
    line-height: 150%;
    color: var(--text-dark-2);
    margin-top: 12px;
  }

  span:nth-of-type(2) {
    font-weight: 600;
    font-size: 20px;
    color: var(--shapes-dark);
    margin-bottom: 24px;
  }

  p {
    font-weight: 400;
    font-size: 12px;
    color: (--text-dark);
  }

  div {
    margin-top: 24px;

    h3 {
      text-transform: uppercase;
      color: var(--text-dark);
      font-weight: 500;
      font-size: 16px;
    }

    p {
      font-size: 14px;
    }
  }
`;

// TODO next/image for otimization
// TODO Separar em componentes menores
export default function Product() {
  const params = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(params.id);

  if (isLoading) return <Loader icon={IconLoader.spinner} />;
  if (!product) return <Loader icon={IconLoader.spinner} />;

  const handleAddToCart = () => {};

  return (
    <DefaultLayout>
      <DivContainer>
        <BackBtn navigate="/" />
        <section>
          <img src={product.imageUrl} />
          <div>
            <ProductInfo>
              {/*
                TODO <span>{product.type}</span>
              */}
              <h2>{product.name}</h2>
              <span>{numberToBrl(product.price)}</span>
              <p>
                *Frete de R$40,00 para todo o Brasil. Grátis para compras acima
                de R$900,00.
              </p>
              <div>
                <h3>Descrição</h3>
                <p>{product.description}</p>
              </div>
            </ProductInfo>
            <button onClick={handleAddToCart}>
              <IconCart />
              Adicionar ao carrinho
            </button>
          </div>
        </section>
      </DivContainer>
    </DefaultLayout>
  );
}
