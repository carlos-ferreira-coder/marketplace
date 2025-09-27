"use client";

import { styled } from "styled-components";
import { Saira_Stencil_One } from "next/font/google";
import { InputSearch } from "./inputSearch";
import { CartControl } from "./cartControl";
import { useFilter } from "@/hooks/useFilter";
import { UserControl } from "./userControl";

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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;

  background-color: var(--shapes);

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 34px 150px;
  }
`;

// TODO Adicionar link para home
const Logo = styled.a`
  cursor: pointer;
  color: var(--logo-color);

  font-size: 40px;
  font-weight: 400;
  text-decoration: none;

  @media (min-width: 768px) {
  }
`;

export const Header = ({ title }: HeaderProps) => {
  const { search, setSearch } = useFilter();

  return (
    <TagHeader>
      <Logo className={sairaStencilOne.className}>{title}</Logo>
      <div>
        <InputSearch
          value={search}
          handleChange={setSearch}
          placeholder="Procurando por algo específico?"
        />
        <CartControl />
        <UserControl />
      </div>
    </TagHeader>
  );
};
