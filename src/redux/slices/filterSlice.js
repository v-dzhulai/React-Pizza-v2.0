import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  categories: ["Всі", "М'ясні", "Вегетаріанські", "Гриль", "Гострі", "Закриті"],
  sort: {
    name: "популярними",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
  },
});

export const { setCategoryId } = filterSlice.actions;
export default filterSlice.reducer;
