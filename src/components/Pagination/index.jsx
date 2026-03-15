import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import {setCurrentPage} from "../../redux/slices/filterSlice";
import {useDispatch} from "react-redux";

const Pagination = ({currentPage}) => {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={16}
      pageCount={2}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
