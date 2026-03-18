import React from "react";
import qs from "qs";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import PizzaList from "../components/PizzaList";
import SkeletonList from "../components/SkeletonList";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {
    categoryId,
    categories,
    sortType,
    sortTypeList,
    searchValue,
    currentPage,
  } = useSelector((state) => state.filter);

  const {items, status} = useSelector((state) => state.pizzas);

  async function getPizzas() {
    const reqCategory = categoryId === 0 ? "" : categoryId;
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? searchValue.toLowerCase() : "";

    dispatch(fetchPizzas({
      currentPage, reqCategory, sortBy, order, search,
    }));

    window.scrollTo(0, 0);
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortParam = sortTypeList.find(
        (obj) => obj.sortProperty === params.sortProperty,
      );

      dispatch(setFilters({ ...params, sortParam }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
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

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} categories={categories} />
        <Sort sortType={sortType} sortTypeList={sortTypeList} />
      </div>

      <h2 className="content__title">
        {searchValue === "" ? `${categories[categoryId]} піци` : "Результати запиту..."}
      </h2>

      <div className="content__items">
        {status === 'loading' ? <SkeletonList /> : <PizzaList pizzas={items} />}
      </div>

      <Pagination currentPage={currentPage}/>
    </>
  );
};

export default Home;
