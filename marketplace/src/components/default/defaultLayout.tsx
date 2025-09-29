"use cliente";

import styled from "styled-components";

export const DefaultLayout = styled.div`
  padding: 24px 45px;
  min-height: 100vh;
  gap: 32px;

  @media (min-width: ${(props) => props.theme.breakpoint.md}) {
    padding: 34px 100px;
  }

  @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
    padding: 34px 150px;
  }
`;
