import { configureStore } from '@reduxjs/toolkit'

import ownersAuthReducer from '../features/owners/auth/authSlice'
import ownersTicketReducer from '../features/owners/tickets/ticketSlice'
import ownersNoteReducer from '../features/owners/notes/noteSlice'

import customersAuthReducer from '../features/customers/auth/authSlice'
import customersTicketReducer from '../features/customers/tickets/ticketSlice'
import customersNoteReducer from '../features/customers/notes/noteSlice'

export const store = configureStore({
  reducer: {
    customersAuth: customersAuthReducer,
    customersTickets: customersTicketReducer,
    customersNotes: customersNoteReducer,
    ownersAuth: ownersAuthReducer,
    ownersTickets: ownersTicketReducer,
    ownersNotes: ownersNoteReducer,
  },
})
