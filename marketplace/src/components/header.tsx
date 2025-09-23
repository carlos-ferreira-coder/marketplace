"use client";

import { styled } from "styled-components";
import { Saira_Stencil_One } from "next/font/google";
import { PrimaryInputSearch } from "./primaryInput";
import { CartControl } from "./cartControl";

const sairaStencilOne = Saira_Stencil_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-saira",
});

interface HeaderProps {
  title: string;
}

const TagHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 150px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
`;

const Logo = styled.a`
  color: var(--logo-color);
  font-size: 40px;
  font-weight: 400;
  text-decoration: none;
`;

export const Header = ({ title }: HeaderProps) => {
  return (
    <TagHeader>
      <Logo className={sairaStencilOne.className}>{title}</Logo>
      <div>
        <PrimaryInputSearch placeholder="Procurando por algo específico?" />
        <CartControl />
      </div>
    </TagHeader>
  );
};
