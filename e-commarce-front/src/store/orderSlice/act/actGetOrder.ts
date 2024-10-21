import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/IsAxiosErrorHand;er";
import { RootState } from "@store/index";
import { TOrderItem } from "@types";

type TResponse = TOrderItem[];
const actGetOrder = createAsyncThunk('orderSlice/actGetOrder', async(_,thunkAPI)=>{
    const {rejectWithValue, getState, signal} = thunkAPI;
    const { AuthReducer } = getState() as RootState;
    try{
        const res = await axios.get<TResponse>(
            `http://localhost:5005/orders?userId=${AuthReducer.user?.id}`,
            { signal }
          );
    
          return res.data;

    }catch (error){
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default actGetOrder;