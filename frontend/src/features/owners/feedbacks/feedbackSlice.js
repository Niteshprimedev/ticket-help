import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import feedbackService from './feedbackService'

import { extractErrorMessage } from '../../../utils'

const initialState = {
  feedback: null,
}

// Get ticket feedback;
export const getOwnerTicketFeedback = createAsyncThunk(
  'feedback/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().ownersAuth.owner.token
      return await feedbackService.getOwnerTicketFeedback(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

const feedbackSlice = createSlice({
  name: 'ownersFeedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOwnerTicketFeedback.pending, (state) => {
        // fetching feedback
        state.feedback = null
      })
      .addCase(getOwnerTicketFeedback.fulfilled, (state, action) => {
        state.feedback = action.payload
      })
  },
})

export default feedbackSlice.reducer
