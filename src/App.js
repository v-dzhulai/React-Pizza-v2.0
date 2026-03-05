import React from "react";

import Categories from "./components/Cetegories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";

import categories from "./state/categories";
import sort from "./state/sort";

import "./scss/app.scss";
import { Skeleton } from "./components/PizzaBlock/Skeleton";

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [sortType, setSortType] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://6367b246edc85dbc84d9ba5d.mockapi.io/products")
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
  }, []);

  const sortTypes = ["popular", "priceLess", "priceHigh"];

  const sortedPizzas = {
    popular: pizzas.toSorted((a, b) => b.rating - a.rating),
    priceHigh: pizzas.toSorted((a, b) => b.price - a.price),
    priceLess: pizzas.toSorted((a, b) => a.price - b.price),
  };

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories categories={categories} />
            <Sort sort={sort} setSortType={setSortType} types={sortTypes} />
          </div>
          <h2 className="content__title">Всі піци</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(4)].map((item, index) => <Skeleton key={index} />)
              : sortedPizzas[sortTypes[sortType]].map((item, index) => (
                  <PizzaBlock key={`${item.id}_${index}`} {...item} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
