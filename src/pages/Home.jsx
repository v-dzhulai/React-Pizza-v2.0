import React from "react";

import Categories from "../components/Cetegories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

import { Skeleton } from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярними",
    sortProperty: "rating",
  });

  const reqCategory = categoryId === 0 ? "" : categoryId;
  const sortBy = sortType.sortProperty.replace("-", "");
  const order = sortType.sortProperty.includes("-") ? "asc" : "desc";

  React.useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://6367b246edc85dbc84d9ba5d.mockapi.io/products?category=${reqCategory}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const categories = [
    "Всі",
    "М'ясні",
    "Вегетаріанські",
    "Гриль",
    "Гострі",
    "Закриті",
  ];

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
        />

        <Sort sortType={sortType} setSortType={setSortType} />
      </div>

      <h2 className="content__title">{categories[categoryId]} піци</h2>

      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((item, index) => <Skeleton key={index} />)
          : pizzas.map((item, index) => (
              <PizzaBlock key={`${item.id}_${index}`} {...item} />
            ))}
      </div>
    </>
  );
};

export default Home;
