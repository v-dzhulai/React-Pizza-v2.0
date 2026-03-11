import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  categories: ["Всі", "М'ясні", "Вегетаріанські", "Гриль", "Гострі", "Закриті"],

  sortType: {
    name: "популярними",
    sortProperty: "rating",
  },

  sort: [
    { name: "популярними", sortProperty: "rating" },
    { name: "найдорожчими", sortProperty: "price" },
    { name: "найдешевшими", sortProperty: "-price" },
    { name: "алфавітом", sortProperty: "-title" },
  ],
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
  },
});

export const { setCategoryId, setSortType } = filterSlice.actions;
export default filterSlice.reducer;
