import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
}

const loggedInSlice = createSlice(
  {
    name: 'logged',
    initialState,
    reducers:{
      logInReducer(state, action){
        const stateLoggedIn = {...state, user: action.payload}
        return stateLoggedIn
      },
      logOutReducer(){
        return {user: null}
      }
    }
  }
)

export default loggedInSlice.reducer

export const {logInReducer, logOutReducer} = loggedInSlice.actions