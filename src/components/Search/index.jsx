import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./Search.module.scss";

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />

      <input
        className={styles.input}
        placeholder="Пошук піци..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />

      {searchValue && (
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.cross}
          onClick={() => setSearchValue("")}
        />
      )}
    </div>
  );
};

export default Search;
