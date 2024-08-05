import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    registerSuccess,
    loginSuccess,
    logoutSuccess,
    refreshUserSuccess,
    refreshUserRequest,
    refreshUserFailure,
} from './slice';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const { data } = await axios.post('/users/signup', credentials);
            setAuthHeader(data.token);
            thunkAPI.dispatch(registerSuccess(data));
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const { data } = await axios.post('/users/login', credentials);
            setAuthHeader(data.token);
            thunkAPI.dispatch(loginSuccess(data));
        } catch (error) {
            toast.error('Log In failed. Please try again.');
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post('/users/logout');
            clearAuthHeader();
            thunkAPI.dispatch(logoutSuccess());
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;

        if (persistedToken === null) {
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }
        try {
            setAuthHeader(persistedToken);
            const res = await axios.get('/users/current');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);