import React from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setSortType } from "../redux/slices/filterSlice";

import Categories from "../components/Cetegories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { AppContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();

  const { categoryId, categories, sortType, sort } = useSelector(
    (state) => state.filter,
  );

  const { searchValue } = React.useContext(AppContext);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const reqCategory = categoryId === 0 ? "" : categoryId;
  const sortBy = sortType.sortProperty.replace("-", "");
  const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
  const search = searchValue ? searchValue.toLowerCase() : "";

  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://6367b246edc85dbc84d9ba5d.mockapi.io/products?` +
          `&p=${currentPage}` +
          `&l=16` +
          `&category=${reqCategory}` +
          `&sortBy=${sortBy}` +
          `&order=${order}` +
          `&title=${search}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  function onChangeCategory(id) {
    dispatch(setCategoryId(id));
  }

  function onChangeSort(obj) {
    dispatch(setSortType(obj));
  }

  const pizzaList = pizzas.map((item, index) => (
    <PizzaBlock key={`${item.id}_${index}`} {...item} />
  ));

  const skeletonList = [...new Array(4)].map((item, index) => (
    <Skeleton key={index} />
  ));

  const paragraph = `${categories[categoryId]} піци`;

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          setCategoryId={onChangeCategory}
          categories={categories}
        />

        <Sort sortType={sortType} sort={sort} setSortType={onChangeSort} />
      </div>

      <h2 className="content__title">
        {searchValue === "" ? paragraph : "Результати запиту..."}
      </h2>

      <div className="content__items">
        {isLoading ? skeletonList : pizzaList}
      </div>

      <Pagination
        currentPage={currentPage}
        onChangePage={(num) => setCurrentPage(num)}
      />
    </>
  );
};

export default Home;
