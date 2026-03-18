import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    "pizzas/fetchPizzasStatus",
    async ({currentPage, reqCategory, sortBy, order, search}) => {
        const {data} = await axios.get(
            `https://6367b246edc85dbc84d9ba5d.mockapi.io/products?` +
            `&p=${currentPage}` +
            `&l=16` +
            `&category=${reqCategory}` +
            `&sortBy=${sortBy}` +
            `&order=${order}` +
            `&title=${search}`,
        );

        return data;
    }
);

const initialState = {
    items: [],
    status: "loading",
};

const pizzasSlice = createSlice({
    name: "pizzas",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = "loading";
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = "error";
                state.items = [];
            });
    }
});

export default pizzasSlice.reducer;