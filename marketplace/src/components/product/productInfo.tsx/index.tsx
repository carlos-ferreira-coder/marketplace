import styled from "styled-components";
import { ProductDetails } from "./productDetails";
import { ProductResponseDTO } from "@/types/dto/product/productResponseDTO";

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 24px;
  width: 100%;
  gap: 32px;

  img {
    width: 50%;
    max-width: 640px;
    object-fit: cover;

    @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
      height: 100vh;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
    flex-direction: row;
    align-items: start;
  }
`;

interface ProductInfoProps {
  product: ProductResponseDTO;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <SectionContainer>
      <img src={product.imageUrl} />
      <ProductDetails product={product} />
    </SectionContainer>
  );
};
