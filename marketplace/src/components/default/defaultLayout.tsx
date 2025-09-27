"use cliente";

import styled from "styled-components";

export const DefaultLayout = styled.div`
  padding: 12px 24px;
  min-height: 100vh;
  gap: 32px;

  @media (min-width: ${(props) => props.theme.breakpoint.md}) {
    padding: 34px 150px;
  }
`;
