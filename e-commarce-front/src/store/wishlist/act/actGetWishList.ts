import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/IsAxiosErrorHand;er";
import { TProduct } from "@types";
import { RootState } from "@store/index";

type TDataType = "productsFullInfo" | "ProductIds";
type TResponce = TProduct[];

const actGetWishlist = createAsyncThunk('WishListSlice/actGetWishlist', async(dataType: TDataType, thunkAPI)=>{
    const {rejectWithValue,signal, getState} = thunkAPI;
    const { AuthReducer } = getState() as RootState;

    try{
        const userWishlist = await axios.get<{ productId: number }[]>(
            `http://localhost:5005/wishlist?userId=${AuthReducer.user?.id}`,{
              signal,
            }
          );
          if (!userWishlist.data.length) {
            return { data: [], dataType: "empty" };
            // return fulfillWithValue([]);
          }
          if (dataType === "ProductIds") {
            const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
            return { data: concatenatedItemsId, dataType: "productsIds" };
          } else {
            const concatenatedItemsId = userWishlist.data
              .map((el) => `id=${el.productId}`)
              .join("&");
  
        const response = await axios.get<TResponce>(
          `http://localhost:5005/products?${concatenatedItemsId}`
        );
        return { data: response.data, dataType: "ProductsFullInfo" };
      }
    }catch (error){
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default actGetWishlist;