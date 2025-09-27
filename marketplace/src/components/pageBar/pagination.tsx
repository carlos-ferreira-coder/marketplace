import styled from "styled-components";
import { Pagination } from "@/hooks/usePagination";
import {
  faAngleLeft,
  faAngleRight,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePage } from "@/hooks/usePage";
import { useEffect, useState } from "react";

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
  line-height: 150%;
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
  const { page, setPage, limit, total } = usePage();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  const pagination = Pagination({ page, limit, total });
  const totalPages = Math.ceil(total / limit);

  const handleChangePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <PageList>
      {pagination.map((item, idx) =>
        item.type === "page" ? (
          <PageItem
            key={`page-${item.value}`}
            selected={item.active}
            onClick={() => handleChangePage(item.value || 0)}
          >
            {item.value}
          </PageItem>
        ) : (
          <PageItem key={`ellipsis-${idx}`} disabled>
            <FontAwesomeIcon icon={faEllipsis} />
          </PageItem>
        )
      )}

      {windowWidth > 768 && (
        <>
          <PageItem
            disabled={page < 2}
            onClick={() => handleChangePage(page - 1)}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </PageItem>

          <PageItem
            disabled={page >= totalPages}
            onClick={() => handleChangePage(page + 1)}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </PageItem>
        </>
      )}
    </PageList>
  );
};
