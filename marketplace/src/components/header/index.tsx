"use client";

import { styled } from "styled-components";
import { Saira_Stencil_One } from "next/font/google";
import { PrimaryInputSearch } from "./primaryInput";
import { CartControl } from "./cartControl";
import { useFilter } from "@/hooks/useFilter";

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

  background-color: var(--shapes);

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
`;

// TODO Adicionar link para home
const Logo = styled.a`
  cursor: pointer;
  color: var(--logo-color);

  font-size: 40px;
  font-weight: 400;
  text-decoration: none;
`;

export const Header = ({ title }: HeaderProps) => {
  const { search, setSearch } = useFilter();

  return (
    <TagHeader>
      <Logo className={sairaStencilOne.className}>{title}</Logo>
      <div>
        <PrimaryInputSearch
          value={search}
          handleChange={setSearch}
          placeholder="Procurando por algo específico?"
        />
        <CartControl />
      </div>
    </TagHeader>
  );
};
