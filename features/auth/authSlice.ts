import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState{
    AccessToken:string,
    userId:string,
    // unix epoch ms when the token expires (client-side policy)
    expiresAt?: number,
}
const initialState:AuthState = {
    AccessToken :'',
    userId:'',
    expiresAt: undefined,
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuth:(state,action :PayloadAction<AuthState>)=>{
            state.AccessToken = action.payload.AccessToken
            state.userId = action.payload.userId
            state.expiresAt = action.payload.expiresAt
        },
        logout: (state) => {
            // Make reducer pure; storage cleanup should be handled by UI/hooks
            state.AccessToken = ''
            state.userId = ''
            state.expiresAt = undefined
        }},
})
export const {setAuth,logout} = authSlice.actions 
export default authSlice.reducer