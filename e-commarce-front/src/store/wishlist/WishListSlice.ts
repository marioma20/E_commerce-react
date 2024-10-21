import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "@types";
import { TLoading } from "@types";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishList";
import { authLogout } from "@store/auth/AuthSlice";

interface IWishList{
    itemsId: number[],
    productsFullInfo: TProduct[];
    error: null | string;
    loading: TLoading;
}
const initialState: IWishList = {
    itemsId: [],
    productsFullInfo: [],
    error: null,
    loading: 'idle',
}


const WishListSlice = createSlice({
    name: "WishListSlice",
    initialState,
    reducers: {
        productsFullInfoCleanUp: (state)=>{
           state.productsFullInfo =  [];
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(actLikeToggle.pending, (state, action)=>{
            state.loading = "pinding";
            state.error = null;
        })
        builder.addCase(actLikeToggle.fulfilled, (state, action)=>{
            if(action.payload.type === "add"){
                state.itemsId .push(action.payload.id);
            }else{
                state.itemsId = state.itemsId.filter((el)=> el !== action.payload.id);
                state.productsFullInfo = state.productsFullInfo.filter((el)=> el.id !== action.payload.id)
            }
        })
        builder.addCase(actLikeToggle.rejected, (state, action)=>{
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
              }
        })

        // get wish list
        builder.addCase(actGetWishlist.pending, (state, action)=>{
            state.loading = "pinding";
            state.error = null;
        })
        builder.addCase(actGetWishlist.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            if (action.payload.dataType === "productsFullInfo") {
                state.productsFullInfo = action.payload.data as TProduct[];
              } else if(action.payload.dataType === "productsIds") {
                state.itemsId = action.payload.data as number[];
              }else{
                state.itemsId = [];
                state.productsFullInfo = [];
              }
        })
        builder.addCase(actGetWishlist.rejected, (state, action)=>{
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                // isString(action.payload)
                state.error = action.payload;
              }
        });
        builder.addCase(authLogout, (state)=>{
            state.itemsId = [];
            state.productsFullInfo = [];
        })
    }
});

export {actLikeToggle, actGetWishlist};

export const {productsFullInfoCleanUp} = WishListSlice.actions;
export default WishListSlice.reducer;