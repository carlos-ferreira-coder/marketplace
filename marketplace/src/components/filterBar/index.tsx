"use client";

import styled from "styled-components";
import { FilterByType } from "./filterByType";
import { FilterByPriority } from "./filterByPriority";

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 24px;
  width: 100%;

  @media (min-width: 758px) {
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
  }
`;

export const FilterBar = () => {
  return (
    <>
      <DivContainer>
        <FilterByType />
        <FilterByPriority />
      </DivContainer>
    </>
  );
};
