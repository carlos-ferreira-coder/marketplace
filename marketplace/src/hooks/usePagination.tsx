interface PaginationItem {
  type: "page" | "ellipsis";
  value: number | null;
  active?: boolean;
}

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  siblings?: number;
}

export const Pagination = ({
  page,
  limit,
  total,
  siblings = 2,
}: PaginationProps): PaginationItem[] => {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const middleCount = 2 * siblings + 1; // páginas centrais esperadas
  const slotsBetween = middleCount + 2; // leftSlot + middleCount + rightSlot

  // Caso trivial / poucas páginas: renderiza todas
  if (totalPages <= middleCount + 2) {
    return Array.from({ length: totalPages }, (_, i) => ({
      type: "page" as const,
      value: i + 1,
      active: i + 1 === page,
    }));
  }

  // Calcula o intervalo contíguo de comprimento `slotsBetween` que conterá o page
  // startRange tem que estar dentro de [2, totalPages - slotsBetween]
  const half = Math.floor(slotsBetween / 2);
  let startRange = page - half;
  const maxStart = totalPages - slotsBetween;
  if (startRange < 2) startRange = 2;
  if (startRange > maxStart) startRange = maxStart;

  const pagesRange: number[] = [];
  for (let i = 0; i < slotsBetween; i++) {
    pagesRange.push(startRange + i);
  }

  // Mapear slotsBetween para: leftSlot, middleSlots, rightSlot
  const leftSlot = pagesRange[0];
  const rightSlot = pagesRange[pagesRange.length - 1];
  const middleSlots = pagesRange.slice(1, pagesRange.length - 1); // length = middleCount

  const items: PaginationItem[] = [];

  // Primeira página (sempre)
  items.push({ type: "page", value: 1, active: page === 1 });

  // left slot: se leftSlot > 2 => ellipsis, senão número (ex.: 2)
  if (leftSlot > 2) {
    items.push({ type: "ellipsis", value: null });
  } else {
    items.push({ type: "page", value: leftSlot, active: leftSlot === page });
  }

  // páginas centrais (sempre middleCount itens)
  for (const p of middleSlots) {
    items.push({ type: "page", value: p, active: p === page });
  }

  // right slot: se rightSlot < totalPages - 1 => ellipsis, senão número (ex.: totalPages-1)
  if (rightSlot < totalPages - 1) {
    items.push({ type: "ellipsis", value: null });
  } else {
    items.push({ type: "page", value: rightSlot, active: rightSlot === page });
  }

  // Última página (sempre)
  items.push({ type: "page", value: totalPages, active: page === totalPages });

  return items;
};
