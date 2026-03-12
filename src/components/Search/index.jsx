import React from "react";
import debounce from "lodash.debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./Search.module.scss";
import { AppContext } from "../../App";

const Search = () => {
  const { setSearchValue } = React.useContext(AppContext);
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  function onClickClear() {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  }

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 300),
    [],
  );

  function onChangeInput(e) {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
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
