import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "../../types/shared";
import { TOrderItem } from "../../types/order";
import actPlaceHolder from "./act/actPlaceHolder";
import { isString } from "../../types/Guards";
import actGetOrder from "./act/actGetOrder";
interface IOrderSlice {
    orderList: TOrderItem[];
    loading: TLoading;
    error: string | null;
  }
  
  const initialState: IOrderSlice = {
    orderList: [],
    loading: "idle",
    error: null,
  };

const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        resetOrderStatus: (state)=>{
            state.loading = "idle";
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        // orderplaceholder
        builder.addCase(actPlaceHolder.pending, (state)=>{
            state.loading = "pinding";
            state.error = null;
        });
        builder.addCase(actPlaceHolder.fulfilled, (state)=>{
            state.loading = "succeeded";
        });
        builder.addCase(actPlaceHolder.rejected, (state, action)=>{
            state.loading = "failed";
            if(isString(action.payload)){
                state.error = action.payload;
            }
        });

        // get order
        builder.addCase(actGetOrder.pending, (state)=>{
            state.loading = "pinding";
            state.error = null;
        });
        builder.addCase(actGetOrder.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.orderList = action.payload;
        });
        builder.addCase(actGetOrder.rejected, (state, action)=>{
            state.loading = "failed";
            if(isString(action.payload)){
                state.error = action.payload;
            }
        });
    }
});

export {actPlaceHolder, actGetOrder};
export const {resetOrderStatus} = orderSlice.actions;
export default orderSlice.reducer;