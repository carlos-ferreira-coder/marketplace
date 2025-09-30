"use client";

import styled, { useTheme } from "styled-components";
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
  const theme = useTheme();
  const { page, setPage, limit, total } = usePage();
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const pagination = Pagination({ page, limit, total });
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      {windowWidth > parseInt(theme.breakpoint.md) && (
        <>
          <PageItem onClick={() => handleChangePage(page - 1)}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PageItem>

          <PageItem onClick={() => handleChangePage(page + 1)}>
            <FontAwesomeIcon icon={faAngleRight} />
          </PageItem>
        </>
      )}
    </PageList>
  );
};
