import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosRequester from "../../Utils/API";

const initialState = {
  loading: false,
  usersData: [],
  error: "",
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async () =>
    await axiosRequester.get(`/`).then((response) => response.data)
);

export const setUser = createAsyncThunk(
  "users/setUsers",
  async (data) =>
    await axiosRequester.post("/", data).then((response) => response.data)
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id) =>
    await axiosRequester.delete(`${id}`).then((response) => response.data)
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (data) =>
    await axiosRequester
      .put(`${data.id}`, data)
      .then((response) => response.data)
);

const usersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.usersData = action.payload;
    },
    [getUsers.rejected]: (state) => {
      state.loading = false;
      state.error = "failed user get api";
    },

    [setUser.pending]: (state) => {
      state.loading = true;
    },
    [setUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.usersData = action.payload;
    },
    [setUser.rejected]: (state) => {
      state.loading = false;
      state.error = "failed user post api";
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.usersData = action.payload;
    },
    [deleteUser.rejected]: (state) => {
      state.loading = false;
      state.error = "failed user post api";
    },

    [editUser.pending]: (state) => {
      state.loading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.usersData = action.payload;
    },
    [editUser.rejected]: (state) => {
      state.loading = false;
      state.error = "failed user post api";
    },
  },
});

export default usersSlice.reducer;
