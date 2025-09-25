"use client";

import styled from "styled-components";
import { PaginationBar } from "./pagination";

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  justify-content: flex-end;
  margin-top: 20px;
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
