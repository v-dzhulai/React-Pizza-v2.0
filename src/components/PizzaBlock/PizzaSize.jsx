import React from "react";

const PizzaSize = ({ size, activeSize, setActiveSize }) => {
  return (
    <ul>
      {size.map((item, index) => {
        return (
          <li
            key={`${item}_${index}`}
            className={activeSize === index ? "active" : ""}
            onClick={() => setActiveSize(index)}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default PizzaSize;
