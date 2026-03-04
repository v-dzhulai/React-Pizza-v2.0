import React from "react";

import Categories from "./components/Cetegories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";

import sortedPizzas from "./state/pizzas";
import categories from "./state/categories";
import sort from "./state/sort";

import "./scss/app.scss";

function App() {
  const sortTypes = [
    sortedPizzas["popular"],
    sortedPizzas["priceLess"],
    sortedPizzas["priceHigh"],
  ];

  const [sortType, setSortType] = React.useState(0);

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories categories={categories} />
            <Sort sort={sort} setSortType={setSortType} />
          </div>
          <h2 className="content__title">Всі піци</h2>
          <div className="content__items">
            {sortTypes[sortType].map((item, index) => {
              return <PizzaBlock key={`${item.id}_${index}`} {...item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
