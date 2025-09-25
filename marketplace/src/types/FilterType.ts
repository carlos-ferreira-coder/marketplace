export enum FilterType {
  "ALL",
  "SHIRTS",
  "PANTS",
  "SHOES",
}

export const FilterTypeLabels: Record<FilterType, string> = {
  [FilterType.ALL]: "TODOS",
  [FilterType.SHIRTS]: "CAMISAS",
  [FilterType.PANTS]: "CALÇAS",
  [FilterType.SHOES]: "SAPATOS",
};
