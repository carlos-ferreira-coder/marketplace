import styled from "styled-components";
import { InputHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export const PrimaryInput = styled.input`
  width: 150px;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;

  background-color: var(--bg-secondary);

  font-family: inherit;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--text-dark);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--orange-low);
  }

  @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
    width: 350px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 150px;

  svg {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-dark);
  }

  &:focus {
    transform: translateY(1px);
  }

  &:active {
    transform: translateY(2px);
  }

  @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
    width: 350px;
  }
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: IconProp;
  handleChange?: (value: string) => void;
}

export const InputIcon = ({ handleChange, icon, ...props }: InputProps) => {
  return (
    <InputContainer>
      <PrimaryInput
        {...props}
        onChange={(event) => {
          handleChange?.(event.target.value);
          props.onChange?.(event);
        }}
      />
      <FontAwesomeIcon icon={icon} />
    </InputContainer>
  );
};
