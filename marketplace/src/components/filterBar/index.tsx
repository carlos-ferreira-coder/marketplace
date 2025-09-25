"use client";

import styled from "styled-components";
import { FilterByType } from "./filterByType";
import { FilterByPriority } from "./filterByPriority";

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  justify-content: space-between;
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
