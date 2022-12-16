import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage
const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const initialState = {
    user: getUser() || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.registerTheUser(user);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.loginTheUser(user);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
});

export const logOut = createAsyncThunk('auth/logout', async () => {
    return await authService.logOutUser();
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: state => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, state => {
            state.isLoading = true;
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload
            })
            .addCase(loginUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = null;
            })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;