
import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "@store/act/Actcategories";
import { TLoading } from "@types";
import { TCategory } from "@types";

interface ICategoriesstate{
    records: TCategory[];
    loading: TLoading;
    error: string | null;
}

const initialState: ICategoriesstate ={
    records: [],
    loading: "idle",
    error: null,
};

const categoriesslice = createSlice({
    name: 'categoriesslice',
    initialState,
    reducers:{
        cleanupCtegories: (state)=>{
            state.records = []
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(actGetCategories.pending, (state, action)=>{
            state.loading = "pinding";
            state.error = null;
        });
        builder.addCase(actGetCategories.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.records = action.payload;
        });
        builder.addCase(actGetCategories.rejected, (state, action)=>{
            state.loading = "failed";
            state.error = action.payload as string;
        })
    }

});

export {actGetCategories};
export const {cleanupCtegories} = categoriesslice.actions;
export default categoriesslice.reducer;