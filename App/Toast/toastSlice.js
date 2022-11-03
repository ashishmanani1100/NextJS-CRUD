import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenToast:false,
    message: "",
    type: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    openToast : (state, action) => {
        state.isOpenToast=true        
        state.message=action.payload.message        
        state.type=action.payload.type        
    },
    closeToast : (state) => {
        state.isOpenToast=false        
        state.message=""        
        state.type=""
    }
  },
});

export const {openToast, closeToast} = toastSlice.actions
export default toastSlice.reducer;
