import styled from "styled-components";
import { InputHTMLAttributes } from "react";
import { iconSearch } from "../fontAwesome";

export const PrimaryInput = styled.input`
  width: 350px;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;

  background-color: var(--bg-secondary);

  font-family: inherit;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--text-dark);
`;

const InputContainer = styled.div`
  position: relative;
  width: 350px;

  svg {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-dark);
  }
`;

export const PrimaryInputSearch = (
  props: InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <InputContainer>
      <PrimaryInput {...props} />
      {iconSearch}
    </InputContainer>
  );
};
