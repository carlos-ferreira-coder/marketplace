import { useFilter } from "@/hooks/useFilter";
import styled from "styled-components";
import {
  iconAngleLeft,
  iconAngleRight,
  iconEllipsis,
} from "../icons/fontAwesome";
import { Pagination } from "@/hooks/usePagination";

interface PageItemProps {
  selected?: boolean;
  disabled?: boolean;
}

const PageList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  list-style: none;
`;

const PageItem = styled.li<PageItemProps>`
  font-family: inherit;
  font-weight: ${(props) => (props.selected ? "600" : "400")};
  font-size: 16px;
  line-height: 22px;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  border: ${(props) =>
    props.selected ? "1px solid var(--orange-low)" : "none"};
  border-radius: 8px;
  background: ${(props) =>
    props.selected ? "var(--bg-shapes-light)" : "var(--shapes-light)"};

  color: ${(props) =>
    props.selected ? "var(--orange-low)" : "var(--text-dark)"};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

export const PaginationBar = () => {
  const { page, setPage, limit, total } = useFilter();

  const pagination = Pagination({ page, limit, total });
  const totalPages = Math.ceil(total / limit);

  const handleChangePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <PageList>
      <PageItem disabled={page < 2} onClick={() => handleChangePage(page - 1)}>
        {iconAngleLeft}
      </PageItem>

      {pagination.map((item, idx) =>
        item.type === "ellipsis" ? (
          <PageItem key={`ellipsis-${idx}`} disabled>
            {iconEllipsis}
          </PageItem>
        ) : (
          <PageItem
            key={`page-${item.value}`}
            selected={item.active}
            onClick={() => handleChangePage(item.value || 0)}
          >
            {item.value}
          </PageItem>
        )
      )}

      <PageItem
        disabled={page >= totalPages}
        onClick={() => handleChangePage(page + 1)}
      >
        {iconAngleRight}
      </PageItem>
    </PageList>
  );
};
