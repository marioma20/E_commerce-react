import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/IsAxiosErrorHand;er";

const actLikeToggle = createAsyncThunk('WishListSlice/actLikeToggle', async(id: number, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{

        const isRecordExist = await axios.get( `http://localhost:5005/wishlist?userId=1&productId=${id}`);
    
          if (isRecordExist.data.length > 0) {
            await axios.delete(`http://localhost:5005/wishlist/${isRecordExist.data[0].id}`);
            return { type: "remove", id };
          } else {
            await axios.post("http://localhost:5005/wishlist", { userId: 1, productId: id });
            return { type: "add", id };
          }
    }catch (error){
        return rejectWithValue(axiosErrorHandler(error));
    }

});

export default actLikeToggle;