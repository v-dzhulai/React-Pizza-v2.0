import React from "react";
import axios from "axios";
import qs from "qs";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Cetegories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

import { Skeleton } from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {
    categoryId,
    categories,
    sortType,
    sort,
    currentPage,
    pageCount,
    pageRangeDisplayed,
    searchValue,
  } = useSelector((state) => state.filter);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const reqCategory = categoryId === 0 ? "" : categoryId;
  const sortBy = sortType.sortProperty.replace("-", "");
  const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
  const search = searchValue ? searchValue.toLowerCase() : "";

  function fetchPizzas() {
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
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortParam = sort.find(
        (obj) => obj.sortProperty === params.sortProperty,
      );

      dispatch(setFilters({ ...params, sortParam }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  function onChangeCategory(id) {
    dispatch(setCategoryId(id));
  }

  function onChangeSort(obj) {
    dispatch(setSortType(obj));
  }

  function onChangeCurrentPage(id) {
    dispatch(setCurrentPage(id));
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
        pageCount={pageCount}
        pageRangeDisplayed={pageRangeDisplayed}
        onChangePage={onChangeCurrentPage}
      />
    </>
  );
};

export default Home;
