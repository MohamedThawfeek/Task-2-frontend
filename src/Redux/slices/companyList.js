import { createSlice } from "@reduxjs/toolkit"


const initialState =  {
  companylist : []
}


const authSlice =  createSlice({
  name: "companylist",
  initialState,
  reducers: {
    addCompany(state, action) {
      state.companylist = action.payload
    }
  }
})

export const { addCompany } = authSlice.actions
export default authSlice.reducer
