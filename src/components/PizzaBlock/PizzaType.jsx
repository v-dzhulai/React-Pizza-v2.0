import React from "react";

const PizzaType = ({ dough, activeType, setActiveType }) => {
  return (
    <ul>
      {dough.map((item, index) => {
        return (
          <li
            key={`${item}_${index}`}
            className={activeType === index ? "active" : ""}
            onClick={() => setActiveType(index)}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default PizzaType;
