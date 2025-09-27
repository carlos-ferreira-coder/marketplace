"use client";

import styled from "styled-components";
import { PaginationBar } from "./pagination";

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    align-items: start;
    justify-content: flex-end;
  }
`;

export const PageBar = () => {
  return (
    <>
      <DivContainer>
        <PaginationBar />
      </DivContainer>
    </>
  );
};
