import { useFilter } from "@/hooks/useFilter";
import { FilterType, FilterTypeLabels } from "@/types/filterType";
import styled from "styled-components";

interface FilterItemProps {
  selected?: boolean;
}

const FilterList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  gap: 24px;

  @media (min-width: 768px) {
    gap: 40px;
  }
`;

const FilterItem = styled.li<FilterItemProps>`
  font-family: inherit;
  font-weight: ${(props) => (props.selected ? "600" : "400")};
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  text-transform: uppercase;

  color: var(--text-dark);

  cursor: pointer;
  border-bottom: ${(props) =>
    props.selected ? "4px solid var(--orange-low)" : "none"};
`;

export const FilterByType = () => {
  const { type, setType } = useFilter();

  const handleChangeType = (newType: FilterType) => {
    setType(newType);
  };

  return (
    <FilterList>
      {Object.values(FilterType)
        .filter((key) => typeof key === "number")
        .map((t) => (
          <FilterItem
            key={t}
            selected={type === t}
            onClick={() => handleChangeType(t)}
          >
            {FilterTypeLabels[t]}
          </FilterItem>
        ))}
    </FilterList>
  );
};
