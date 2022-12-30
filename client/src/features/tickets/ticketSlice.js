import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
    allTickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const createNewTicket = createAsyncThunk('tickets/create', async (ticketData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.createTicketForUser(ticketData, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
});

export const getAllTicketsforUser = createAsyncThunk('tickets/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.getTicketsForUser(token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
});

export const getTicket = createAsyncThunk('tickets/get', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.getTicketById(ticketId, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
});

export const closeTicket = createAsyncThunk('tickets/close', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.closeUserTicket(ticketId, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
});


export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: state => initialState
    },
    extraReducers: builder => {
        builder.addCase(createNewTicket.pending, state => { state.isLoading = true })
            .addCase(createNewTicket.fulfilled, state => { state.isLoading = false; state.isSuccess = true })
            .addCase(createNewTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllTicketsforUser.pending, state => { state.isLoading = true })
            .addCase(getAllTicketsforUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allTickets = action.payload;
            })
            .addCase(getAllTicketsforUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTicket.pending, state => { state.isLoading = true })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allTickets = state.allTickets.map(t => t._id === action.payload._id ? (t.status = 'closed') : t);
            });
    }
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;