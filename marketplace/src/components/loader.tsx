import { faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const DivContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 20vh;

  svg {
    width: 45px;
    height: 45px;

    animation: spin 2s infinite;
    color: var(--orange-low);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const enum IconLoader {
  spinner,
  circleNotch,
}

interface LoaderProps {
  icon: IconLoader;
}

export const Loader = ({ icon }: LoaderProps) => {
  return (
    <DivContainer>
      {icon === IconLoader.spinner && <FontAwesomeIcon icon={faSpinner} />}
      {icon === IconLoader.circleNotch && (
        <FontAwesomeIcon icon={faCircleNotch} />
      )}
    </DivContainer>
  );
};
