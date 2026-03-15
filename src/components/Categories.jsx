import React from "react";
import {useDispatch} from "react-redux";
import {setCategoryId} from "../redux/slices/filterSlice";

function Categories({categoryId, categories}) {
    const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={`${index}_${item}`}
              className={categoryId === index ? "active" : ""}
              onClick={() => dispatch(setCategoryId(index))}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
