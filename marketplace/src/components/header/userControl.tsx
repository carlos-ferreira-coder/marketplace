import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IconUser } from "../icons/userSvg";

interface UserControlListProps {
  isOpen: boolean;
}

interface UserControlItemProps {
  selected?: boolean;
}

const DivContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  button {
    border: none;
    cursor: pointer;
    background: transparent;

    color: var(--text-dark);

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 23px;
      height: 23px;
    }
  }
`;

const UserControlList = styled.ul<UserControlListProps>`
  position: absolute;
  padding: 12px 16px;
  width: 200px;
  z-index: 999;

  top: 175%;
  right: -50%;

  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);

  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: translateY(${(props) => (props.isOpen ? "0" : "-10px")});

  list-style: none;

  li + li {
    margin-top: 4px;
  }

  @media (min-width: 758px) {
    right: 0;
  }
`;

const UserControlItem = styled.li<UserControlItemProps>`
  font-family: inherit;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;

  color: ${(props) =>
    props.selected ? "var(--orange-low)" : "var(--text-dark)"};
`;

export const UserControl = () => {
  const user = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DivContainer ref={containerRef}>
      <button onClick={handleOpen}>
        <IconUser />
      </button>

      {
        // TODO ITEMS
        isOpen && (
          <UserControlList isOpen={isOpen}>
            <UserControlItem selected={true} onClick={() => {}}>
              login
            </UserControlItem>
            <UserControlItem selected={false} onClick={() => {}}>
              sair
            </UserControlItem>
          </UserControlList>
        )
      }
    </DivContainer>
  );
};
