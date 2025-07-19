import { configureStore } from '@reduxjs/toolkit'

import ownersAuthReducer from '../features/owners/auth/authSlice'
import ownersTicketReducer from '../features/owners/tickets/ticketSlice'
import ownersNoteReducer from '../features/owners/notes/noteSlice'
import ownersProductReducer from '../features/owners/products/productSlice'

import customersAuthReducer from '../features/customers/auth/authSlice'
import customersTicketReducer from '../features/customers/tickets/ticketSlice'
import customersNoteReducer from '../features/customers/notes/noteSlice'
import customersProductOwnerReducer from '../features/customers/products/productOwnerSlice'
import customersFeedbackReducer from '../features/customers/feedbacks/feedbackSlice'

export const store = configureStore({
  reducer: {
    customersAuth: customersAuthReducer,
    customersTickets: customersTicketReducer,
    customersNotes: customersNoteReducer,
    customersProductOwners: customersProductOwnerReducer,
    customersFeedback: customersFeedbackReducer,
    ownersAuth: ownersAuthReducer,
    ownersTickets: ownersTicketReducer,
    ownersNotes: ownersNoteReducer,
    ownersProducts: ownersProductReducer,
  },
})
