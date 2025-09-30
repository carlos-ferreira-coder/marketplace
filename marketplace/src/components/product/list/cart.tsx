"use client";

import { Divider } from "@/components/divider";
import { ProductResponseDTO } from "@/types/dto/product/productResponseDTO";
import { numberToBrl } from "@/utils/numberToBrl";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 0px 0px 4px 4px;

  width: 250px;

  img {
    width: 250px;
    height: 300px;
    object-fit: cover;
  }

  h3 {
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    color: var(--text-dark-2);
  }

  p {
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    color: var(--shapes-dark);
  }

  div {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    padding: 8px 12px;
    width: 100%;
  }
`;

// TODO next/image for otimization
export const ProductCard = ({
  id,
  name,
  imageUrl,
  price,
}: ProductResponseDTO) => {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/product/${id}`)}>
      <img src={imageUrl} alt={name} />
      <div>
        <h3>{name}</h3>
        <Divider />
        <p>{numberToBrl(price)}</p>
      </div>
    </Card>
  );
};
