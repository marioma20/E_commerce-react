import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/IsAxiosErrorHand;er";


type TFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

const actAuthRegister = createAsyncThunk(
    'AuthSlice/actAuthRegister', 
    async(formData: TFormData, thunk)=>{
        const {rejectWithValue} = thunk;
        try{
            const res = await axios.post("http://localhost:5005/users/register", formData);
            return res.data;
        }catch (error){
            return rejectWithValue(axiosErrorHandler(error))
        }
});

// http://localhost:5005/users/register
export default actAuthRegister;