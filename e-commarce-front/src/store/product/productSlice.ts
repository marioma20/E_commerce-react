
import { createSlice } from "@reduxjs/toolkit";
import actGetProduct from "@store/act/ActProduct";
import { TLoading } from "@types";
import { TProduct } from "@types";

interface ICategoriesstate{
    records: TProduct[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICategoriesstate ={
    records: [],
    loading: "idle",
    error: null,
};

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers:{
        cleanup : (state)=>{
            state.records = [];
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(actGetProduct.pending, (state, action)=>{
            state.loading = "pinding";
            state.error = null;
        });
        builder.addCase(actGetProduct.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.records = action.payload;
        });
        builder.addCase(actGetProduct.rejected, (state, action)=>{
            state.loading = "failed";
            state.error = action.payload as string;
        });
    },
});

export {productSlice};
export const {cleanup} = productSlice.actions;
export default productSlice.reducer;