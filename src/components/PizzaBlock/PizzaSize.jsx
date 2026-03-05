import React from "react";

const PizzaSize = ({ size }) => {
  let [activeSize, setActiveSize] = React.useState(0);

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
