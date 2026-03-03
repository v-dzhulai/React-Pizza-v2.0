import React from "react";

function Categories({ categories }) {
  const [active, setActive] = React.useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={`${index}_${item}`}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
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
