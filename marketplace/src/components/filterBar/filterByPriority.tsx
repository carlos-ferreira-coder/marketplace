import styled from "styled-components";
import { IconAngleDown, IconAngleUp } from "../icons/fontAwesome";
import { useState } from "react";
import { useFilter } from "@/hooks/useFilter";
import { FilterPriority, FilterPriorityLabels } from "@/types/FilterPriority";

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

const PriorityFilter = styled.ul`
  position: absolute;
  padding: 12px 16px;
  width: 200px;
  z-index: 999;

  top: 150%;
  right: 0;

  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

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

// TODO click outside close
export const FilterByPriority = () => {
  const { priority, setPriority } = useFilter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen((prev) => !prev);

  const handleUpdatePriority = (newPriority: FilterPriority) => {
    setPriority(newPriority);
    setIsOpen(false);
  };

  return (
    <FilterContainer>
      <button onClick={handleOpen}>
        Organizar por {isOpen ? <IconAngleUp /> : <IconAngleDown />}
      </button>

      {isOpen && (
        <PriorityFilter>
          {Object.values(FilterPriority)
            .filter((key) => typeof key === "number") // evita duplicar porque TS enum gera keys numéricas e string
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
