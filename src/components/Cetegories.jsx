import React from "react";

function Categories({ categoryId, setCategoryId, categories }) {
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={`${index}_${item}`}
              className={categoryId === index ? "active" : ""}
              onClick={() => setCategoryId(index)}
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
