import { createSlice } from '@reduxjs/toolkit';
import { logIn, register, refreshUser, logOut } from './operations';

const initialState = {
    user: null,
    isLoggedIn: false,
    isRefreshing: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(refreshUser.pending, state => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.rejected, state => {
                state.isRefreshing = false;
            })
            .addCase(logOut.fulfilled, state => {
                state.user = null;
                state.isLoggedIn = false;
            });
    },
});

export default authSlice.reducer;