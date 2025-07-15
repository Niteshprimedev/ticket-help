import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../../utils'

// NOTE: removed isLoading, isSuccess, isError, message and reset
// loading can be infered from presence or absence of notes
// success can be infered from presence or absence of notes
// error meassages can be recieved at component level from our AsyncThunkAction
// reset was never actually used

const initialState = {
  notes: null,
}

// Get ticket notes
export const getCustomerTicketNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().customersAuth.customer.token
      return await noteService.getCustomerTicketNotes(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Create ticket note
export const createCustomerTicketNote = createAsyncThunk(
  'notes/create',
  async ({ noteContent: noteData, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().customersAuth.customer.token
      return await noteService.createCustomerTicketNote(
        noteData,
        ticketId,
        token
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const noteSlice = createSlice({
  name: 'customersNotes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerTicketNotes.pending, (state) => {
        // NOTE: reset notes to null on pending so we can show a Spinner while
        // fetching notes
        state.notes = null
      })
      .addCase(getCustomerTicketNotes.fulfilled, (state, action) => {
        // NOTE: even if there are no notes for the ticket we get an empty
        // array, so we can use this to detect if we have notes or are fetching
        // notes. Payload will be an array of notes or an empty array, either
        // means we have finished fetching the notes.
        state.notes = action.payload
      })
      .addCase(createCustomerTicketNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })
  },
})

export default noteSlice.reducer
