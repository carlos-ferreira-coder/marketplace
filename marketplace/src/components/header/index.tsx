"use client";

import { styled, useTheme } from "styled-components";
import { Saira_Stencil_One } from "next/font/google";
import { CartControl } from "./cartControl";
import { useFilter } from "@/hooks/useFilter";
import { UserControl } from "./userControl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";
import { InputIcon } from "../input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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

  @media (min-width: ${(props) => props.theme.breakpoint.md}) {
    flex-direction: row;
    padding: 34px 150px;
  }
`;

const Logo = styled.a`
  cursor: pointer;
  color: var(--logo-color);

  font-size: 40px;
  font-weight: 400;
  text-decoration: none;
`;

export const Header = ({ title }: HeaderProps) => {
  const api = useApi();
  const theme = useTheme();
  const router = useRouter();

  if (api.error) toast.error("Api not responding!");

  const { search, setSearch } = useFilter();
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigate = (navigate: string) => {
    router.push(navigate);
  };

  return (
    <TagHeader>
      <Logo
        className={sairaStencilOne.className}
        onClick={() => handleNavigate("/")}
      >
        {title}
      </Logo>
      <div>
        <InputIcon
          icon={faSearch}
          value={search}
          handleChange={setSearch}
          placeholder={
            windowWidth < parseInt(theme.breakpoint.xl)
              ? "Buscar..."
              : "Procurando por algo específico?"
          }
        />
        <CartControl />
        <UserControl />
      </div>
    </TagHeader>
  );
};
