import styled from "styled-components";

interface ButtonProps {
  background?: "info" | "success" | "delete" | "white" | "default";
  textTransform?: string;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 32px;

  background: ${(props) => {
    switch (props.background) {
      case "info":
        return "var(--info-color)";
      case "success":
        return "var(--success-color)";
      case "delete":
        return "var(--delete-color)";
      case "white":
        return "white";
      default:
        return "var(--orange-low)";
    }
  }};

  &:active {
    transform: translateY(2px);
  }

  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);

  border-radius: 4px;
  border: ${(props) =>
    props.background !== "white" ? "none" : "1px solid rgba(0, 0, 0, 0.1)"};
  padding: 10px 0;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  text-transform: ${(props) => props.textTransform};

  color: ${(props) =>
    props.background !== "white" ? "white" : "var(--text-dark)"};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;
