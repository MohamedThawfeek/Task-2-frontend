import { createSlice } from "@reduxjs/toolkit"


const initialState =  {
    userexp : null
}


const authSlice =  createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    addUserDetails(state, action) {
      state.userexp = action.payload
    }
  }
})

export const { addUserDetails } = authSlice.actions
export default authSlice.reducer
