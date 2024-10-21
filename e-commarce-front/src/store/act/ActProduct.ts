import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/IsAxiosErrorHand;er";
import { TProduct } from "@types";

type TResponse =  TProduct[];
const actGetProduct = createAsyncThunk('productSlice/actGetProduct', async(prefix: string, thunkApi)=>{

    const {rejectWithValue, signal} = thunkApi;

    try{
        const response = await axios.get<TResponse>(`http://localhost:5005/products?cat_prefix=${prefix}`,{
            signal,
        });
        return response.data;
    }catch (error){
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default actGetProduct;