import { ProductResponseDTO } from "@/types/dto/products/productResponseDTO";
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
    padding: 8px 0px;

    > div {
      width: 228px;
      height: 1px;
      margin: 8px 0px;
      padding: 0px;
      background: var(--shapes-2);
    }
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

  const handleNavigate = () => {
    router.push(`/product/${id}`);
  };

  return (
    <Card onClick={handleNavigate}>
      <img src={imageUrl} alt={name} />
      <div>
        <h3>{name}</h3>
        <div></div>
        <p>{numberToBrl(price)}</p>
      </div>
    </Card>
  );
};
