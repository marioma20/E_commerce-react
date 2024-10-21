
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/IsAxiosErrorHand;er";

type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken: string;
};

const actAuthLogin = createAsyncThunk(
  "authSlice/actAuthLogin",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axios.post<TResponse>(`http://localhost:5005/users/login`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

// http://localhost:5005/users/login
export default actAuthLogin;