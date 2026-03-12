import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  pageCount,
  pageRangeDisplayed,
  onChangePage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
