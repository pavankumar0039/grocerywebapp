import { createSlice } from '@reduxjs/toolkit'
const initialState = {
   accounttype: "",
   _id: "",
   name: "",
   email: "",
   profile_pic: "",
   token: "",
   orderdetails:[]
}
export const Userslice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.accounttype = action.payload.accounttype
         state._id = action.payload._id
         state.name = action.payload.username
         state.email = action.payload.email
         state.profile_pic = action.payload.profilepic
      },
      setToken: (state, action) => {
         state.token = action.payload
      },
      setOrder:(state,action)=>{
         state.orderdetails = action.payload
      },
      logout: (state, action) => {
         state.accounttype=""
         state._id = ""
         state.name = ""
         state.email = ""
         state.profile_pic = ""
         state.token = ""
         state.socketConnnection = ""
      }


   }
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout,setOrder } = Userslice.actions

export default Userslice.reducer