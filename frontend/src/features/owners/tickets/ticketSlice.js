import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../../utils'

// NOTE: no need for isLoading, isSuccess, isError or message as we can leverage
// our AsyncThunkAction and get Promise reolved or rejected messages at
// component level
const initialState = {
  tickets: null,
  ticket: null,
}

// Create new ticket
export const createOwnerTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().ownersAuth.owner.token
      return await ticketService.createOwnerTicket(ticketData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user tickets
export const getOwnerTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().ownersAuth.owner.token
      return await ticketService.getOwnerTickets(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user ticket
export const getOwnerSingleTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().ownersAuth.owner.token
      return await ticketService.getOwnerSingleTicket(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Close ticket
export const closeOwnerTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().ownersAuth.owner.token
      return await ticketService.closeOwnerTicket(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// NOTE: removed loading, isSuccess state as it can be infered from presence or
// absence of tickets for simpler state management with no need for a reset
// function

export const ticketSlice = createSlice({
  name: 'ownersTickets',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOwnerTickets.pending, (state) => {
        // NOTE: clear single ticket on tickets page, this replaces need for
        // loading state on individual ticket
        state.ticket = null
      })
      .addCase(getOwnerTickets.fulfilled, (state, action) => {
        state.tickets = action.payload
      })
      .addCase(getOwnerSingleTicket.fulfilled, (state, action) => {
        state.ticket = action.payload
      })
      .addCase(closeOwnerTicket.fulfilled, (state, action) => {
        state.ticket = action.payload
        state.tickets = state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        )
      })
  },
})

export default ticketSlice.reducer
