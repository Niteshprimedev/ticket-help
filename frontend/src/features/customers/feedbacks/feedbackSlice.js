import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import feedbackService from './feedbackService'

import { extractErrorMessage } from '../../../utils'

const initialState = {
  feedbacks: [],
  feedback: null,
}

// Get ticket feedback
export const getCustomerTicketFeedback = createAsyncThunk(
  'feedback/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().customersAuth.customer.token
      return await feedbackService.getCustomerTicketFeedback(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get review feedbacks
export const getCustomerReviewFeedbacks = createAsyncThunk(
  'feedback/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().customersAuth.customer.token
      return await feedbackService.getCustomerReviewFeedbacks(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Create ticket feedback
export const createCustomerTicketFeedback = createAsyncThunk(
  'feedback/create',
  async ({ feedbackData, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().customersAuth.customer.token
      return await feedbackService.createCustomerTicketFeedback(
        feedbackData,
        ticketId,
        token
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

const feedbackSlice = createSlice({
  name: 'customersFeedbacks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerTicketFeedback.pending, (state) => {
        // NOTE: reset feedback to null on pending so we can show a Spinner while
        // fetching feedback
        state.feedback = null
      })
      .addCase(getCustomerTicketFeedback.fulfilled, (state, action) => {
        // NOTE: even if there are no feedback for the ticket we get an empty
        // array, so we can use this to detect if we have feedback or are fetching
        // feedback. Payload will be an array of feedback or an empty array, either
        // means we have finished fetching the feedback.
        state.feedback = action.payload
      })
      .addCase(createCustomerTicketFeedback.fulfilled, (state, action) => {
        state.feedback = action.payload
      })
      .addCase(getCustomerReviewFeedbacks.pending, (state) => {
        state.feedbacks = []
      })
      .addCase(getCustomerReviewFeedbacks.fulfilled, (state, action) => {
        state.feedbacks = action.payload
      })
      .addCase(getCustomerReviewFeedbacks.rejected, (state, action) => {
        state.feedbacks = []
      })
  },
})

export default feedbackSlice.reducer
