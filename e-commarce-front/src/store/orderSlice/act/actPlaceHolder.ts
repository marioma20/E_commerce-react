import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/IsAxiosErrorHand;er";
import { RootState } from "@store/index";


const actPlaceHolder = createAsyncThunk('orderSlice/actPlaceHolder', async(subtotal: number, thunkAPI)=>{

    const {rejectWithValue, getState} = thunkAPI ;
    const {cartReducer, AuthReducer} = getState() as RootState ;
    const orderItems = cartReducer.productFullInfo.map((el) => ({
        id: el.id,
        title: el.title,
        price: el.price,
        img: el.img,
        quantity: cartReducer.items[el.id],
      }));
      try{
        const res = await axios.post(`http://localhost:5005/orders`, {
            userId: AuthReducer.user?.id,
            items: orderItems,
            subtotal,
          });

      }catch (error){
        return rejectWithValue(axiosErrorHandler(error));
      }
});

export default actPlaceHolder;

