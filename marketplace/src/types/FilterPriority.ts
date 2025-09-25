export enum FilterPriority {
  "NEWS",
  "POPULARITY",
  "PRICE_HIGH_TO_LOW",
  "PRICE_LOW_TO_HIGH",
}

export const FilterPriorityLabels: Record<FilterPriority, string> = {
  [FilterPriority.NEWS]: "Novidades",
  [FilterPriority.POPULARITY]: "Mais vendidos",
  [FilterPriority.PRICE_HIGH_TO_LOW]: "Preço: Maior - menor",
  [FilterPriority.PRICE_LOW_TO_HIGH]: "Preço: Menor - maior",
};
