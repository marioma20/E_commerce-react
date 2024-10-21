import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../index";
import { TProduct } from "@types";
import axiosErrorHandler from "@util/IsAxiosErrorHand;er";
type TResponse = TProduct[];
const actgetproductbyitems = createAsyncThunk("cartslice/actgetproductbyitems", async(_, thunkAPI)=>{
    const { rejectWithValue, fulfillWithValue, getState , signal} = thunkAPI;
    const { cartReducer } = getState() as RootState;
    const itemsId = Object.keys(cartReducer.items);

    if (!itemsId.length) {
      return fulfillWithValue([]);
    }
     try{
        const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");
        const response = await axios.get<TResponse>(
          `http://localhost:5005/products?${concatenatedItemsId}`,{
            signal,
          }
        );
        return response.data;

     }catch (error){
        return rejectWithValue(axiosErrorHandler(error));
     }

});

export default actgetproductbyitems;