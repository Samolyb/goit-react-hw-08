import { createSlice } from '@reduxjs/toolkit';
import { logIn, register, refreshUser, logOut } from './operations';

const initialState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(refreshUser.pending, state => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.rejected, state => {
                state.isRefreshing = false;
            })
            .addCase(logOut.fulfilled, state => {
                state.user.name = null;
                state.user.email = null;
                state.token = null;
                state.isLoggedIn = false;
            });
    },
});

export default authSlice.reducer;