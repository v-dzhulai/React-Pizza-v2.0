import { createSlice } from "@reduxjs/toolkit";
import {calcTotalPrice, calcTotalCount} from "../../utils/calcVlues";

const initialState = {
    totalPrice: 0,
    totalCount: 0,
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find(obj => obj._id === action.payload._id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({...action.payload, count: 1});
            }

            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
        },

        removePosition: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload._id);
            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
        },

        removeItem: (state, action) => {
            const findItem = state.items.find(obj => obj._id === action.payload._id);

            if (findItem.count > 1) {
                findItem.count--;
            } else {
                state.items = state.items.filter(item => item._id !== action.payload._id);
            }

            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        },
    },
});

export const {
    addItem,
    removeItem,
    clearCart,
    removePosition
} = cartSlice.actions;

export default cartSlice.reducer;