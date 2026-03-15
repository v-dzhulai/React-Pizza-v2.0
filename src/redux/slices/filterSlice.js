import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  categories: ["Всі", "М'ясні", "Вегетаріанські", "Гриль", "Гострі", "Закриті"],

  sortType: {
    name: "популярними",
    sortProperty: "rating",
  },

  sortTypeList: [
    { name: "популярними", sortProperty: "rating" },
    { name: "найдорожчими", sortProperty: "price" },
    { name: "найдешевшими", sortProperty: "-price" },
    { name: "алфавітом", sortProperty: "-title" },
  ],

  currentPage: 1,
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },

    setSortType(state, action) {
      state.sortType = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },

    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sortType;
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
