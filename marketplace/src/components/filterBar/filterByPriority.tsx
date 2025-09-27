import styled from "styled-components";
import { useState } from "react";
import { useFilter } from "@/hooks/useFilter";
import { FilterPriority, FilterPriorityLabels } from "@/types/filterPriority";
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

interface PriorityFilterProps {
  isOpen: boolean;
}
interface FilterItemProps {
  selected?: boolean;
}

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  button {
    border: none;
    cursor: pointer;
    background: transparent;

    font-family: inherit;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: var(--text-dark);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    margin-left: 10px;
  }
`;

const PriorityFilter = styled.ul<PriorityFilterProps>`
  position: absolute;
  padding: 12px 16px;
  width: 200px;
  z-index: 999;

  top: 150%;
  right: 0;

  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: translateY(${(props) => (props.isOpen ? "0" : "-10px")});

  list-style: none;

  li + li {
    margin-top: 4px;
  }
`;

const FilterItem = styled.li<FilterItemProps>`
  font-family: inherit;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;

  color: ${(props) =>
    props.selected ? "var(--orange-low)" : "var(--text-dark)"};
`;

export const FilterByPriority = () => {
  const { priority, setPriority } = useFilter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => setIsOpen((prev) => !prev);

  const handleUpdatePriority = (newPriority: FilterPriority) => {
    setPriority(newPriority);
    setIsOpen(false);
  };

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
    <FilterContainer ref={containerRef}>
      <button onClick={handleOpen}>
        Organizar por{" "}
        {isOpen ? (
          <FontAwesomeIcon icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} />
        )}
      </button>

      {isOpen && (
        <PriorityFilter isOpen={isOpen}>
          {Object.values(FilterPriority)
            .filter((key) => typeof key === "number")
            .map((p) => (
              <FilterItem
                key={p}
                onClick={() => handleUpdatePriority(p)}
                selected={priority === p}
              >
                {FilterPriorityLabels[p]}
              </FilterItem>
            ))}
        </PriorityFilter>
      )}
    </FilterContainer>
  );
};
