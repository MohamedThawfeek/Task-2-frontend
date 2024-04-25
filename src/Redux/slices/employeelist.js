import { createSlice } from "@reduxjs/toolkit"


const initialState =  {
    employeelist : []
}


const authSlice =  createSlice({
  name: "employeelist",
  initialState,
  reducers: {
    addEmployee(state, action) {
      state.employeelist = action.payload
    }
  }
})

export const { addEmployee } = authSlice.actions
export default authSlice.reducer
