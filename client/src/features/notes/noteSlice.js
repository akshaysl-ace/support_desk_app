import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import noteService from './noteService';

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const getTicketNotes = createAsyncThunk('notes/getAll', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.getNotesForTicket(ticketId, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
});

export const createTicketNote = createAsyncThunk('notes/create', async ({ text, ticketId }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.createNoteForTicket(text, ticketId, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
});

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: state => initialState
    },
    extraReducers: builder => {
        builder.addCase(getTicketNotes.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getTicketNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.notes = action.payload
            })
            .addCase(getTicketNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(createTicketNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicketNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes.push(action.payload);
            })
            .addCase(createTicketNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            });
    }
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;