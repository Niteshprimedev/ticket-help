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
export const getOwnerTicketNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().ownersAuth.owner.token
      return await noteService.getOwnerTicketNotes(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Create ticket note
export const createOwnerTicketNote = createAsyncThunk(
  'notes/create',
  async ({ noteContent: noteData, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().ownersAuth.owner.token
      return await noteService.createOwnerTicketNote(noteData, ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const noteSlice = createSlice({
  name: 'ownersNotes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOwnerTicketNotes.pending, (state) => {
        // NOTE: reset notes to null on pending so we can show a Spinner while
        // fetching notes
        state.notes = null
      })
      .addCase(getOwnerTicketNotes.fulfilled, (state, action) => {
        // NOTE: even if there are no notes for the ticket we get an empty
        // array, so we can use this to detect if we have notes or are fetching
        // notes. Payload will be an array of notes or an empty array, either
        // means we have finished fetching the notes.
        state.notes = action.payload
      })
      .addCase(createOwnerTicketNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })
  },
})

export default noteSlice.reducer
