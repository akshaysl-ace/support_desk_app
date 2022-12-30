import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';
import tickets from '../features/tickets/ticketSlice';
import notes from '../features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    auth,
    tickets,
    notes
  },
});
