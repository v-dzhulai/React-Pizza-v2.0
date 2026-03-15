import React from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { setSearchValue } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  function onClickClear() {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  }

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 300),
    [],
  );

  function onChangeInput(e) {
    updateSearchValue(e.target.value);
    setValue(e.target.value);
  }

  return (
    <div className={styles.root}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />

      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Пошук піци..."
        value={value}
        onChange={onChangeInput}
      />

      {value && (
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.cross}
          onClick={onClickClear}
        />
      )}
    </div>
  );
};

export default Search;
