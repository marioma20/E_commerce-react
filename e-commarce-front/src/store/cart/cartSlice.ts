import {createSlice } from "@reduxjs/toolkit";
import { TProduct } from "@types";
import { getCartTotalQuantitySelector } from "@store/selector";
import { itemQuantityAvailabilityCheckingSelector } from "@store/selector";
import actgetproductbyitems from "./act/actgetproducrbyitems";
import { TLoading } from "@types";
interface ICartState {
    items: { [key: number]: number };
    productFullInfo: TProduct[];
    loading: TLoading;
    error: null | string;
}
const initialState: ICartState = {
    items:{},
    productFullInfo: [],
    loading: "idle",
    error: null,
}
const cartslice = createSlice({
    name: "cartslice",
    initialState,
    reducers: {
        addtocart: (state, action) =>{
            const id = action.payload;
            if(state.items[id]){
                state.items[id]++;
            }else{
                state.items[id] = 1;
            }
        },
        cartItemChangeQuantity: (state, action) => {
            state.items[action.payload.id] = action.payload.quantity;
          },
          cartItemRemove: (state, action) => {
            delete state.items[action.payload];
            state.productFullInfo = state.productFullInfo.filter(
              (el) => el.id !== action.payload
            );
        },
        cleanCartProductFullInfo: (state)=>{
            state.productFullInfo = [];
        },
        clearCartAfterPlaceOrder: (state)=>{
            state.items = {};
            state.productFullInfo = [];
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(actgetproductbyitems.pending, (state, action)=>{
            state.loading = "pinding";
            state.error = null;
        });
        builder.addCase(actgetproductbyitems.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.productFullInfo = action.payload;
        });
        builder.addCase(actgetproductbyitems.rejected, (state, action)=>{
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                // isString(action.payload)
                state.error = action.payload;
              }
        });
    }
});


export {
    getCartTotalQuantitySelector,
    itemQuantityAvailabilityCheckingSelector,
    actgetproductbyitems
};

export const {addtocart, cartItemChangeQuantity, cartItemRemove, cleanCartProductFullInfo, clearCartAfterPlaceOrder} = cartslice.actions;
export default cartslice.reducer;