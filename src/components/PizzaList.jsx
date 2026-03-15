import React from "react";
import PizzaBlock from "./PizzaBlock";

const PizzaList = ({pizzas}) => {
    return (
        <>
            {pizzas.map((item, index) => (
                <PizzaBlock key={`${item.id}_${index}`} {...item} />
            ))}
        </>
    );
};

export default PizzaList;