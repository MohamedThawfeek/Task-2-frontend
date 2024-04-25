import { createSlice } from "@reduxjs/toolkit"


const initialState =  {
    productlist : []
}


const authSlice =  createSlice({
  name: "productlist",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.productlist = action.payload
    }
  }
})

export const { addProduct } = authSlice.actions
export default authSlice.reducer
