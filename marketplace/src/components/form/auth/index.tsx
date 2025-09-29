"use client";

import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  gap: 32px;
  margin: 50px auto;

  background: white;
  border-radius: 8px;

  max-width: 60vh;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 250px;

  max-width: 45vh;

  @media (min-width: ${(props) => props.theme.breakpoint.md}) {
    width: 350px;
    flex-direction: row;
  }
`;
