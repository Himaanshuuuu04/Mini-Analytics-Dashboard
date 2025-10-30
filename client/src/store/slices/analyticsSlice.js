import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

// Async thunk for fetching analytics data
export const fetchAnalyticsData = createAsyncThunk(
  "analytics/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/analytics");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    resetAnalytics: (state) => {
      state.isLoading = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetAnalytics } = analyticsSlice.actions;

export default analyticsSlice.reducer;
