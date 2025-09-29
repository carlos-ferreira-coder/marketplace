"use client";

import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  gap: 32px;

  background: white;
  border-radius: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;

  @media (min-width: ${(props) => props.theme.breakpoint.md}) {
    flex-direction: row;
  }
`;
