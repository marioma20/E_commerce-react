import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/IsAxiosErrorHand;er";
import { TCategory } from "@types";

type TResponse =  TCategory[];
const actGetCategories = createAsyncThunk('categoriesslice/actGetCategories', async(_, thunkApi)=>{

    const {rejectWithValue, signal} = thunkApi;

    try{
        const response = await axios.get<TResponse>(`http://localhost:5005/categories`,{
            signal,
        });
        return response.data;
    }catch (error){
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default actGetCategories;