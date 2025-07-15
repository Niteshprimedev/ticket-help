import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import authService from './authService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../../utils'

// Get user from localstorage
const customer = JSON.parse(localStorage.getItem('customer'))

// NOTE: remove isSuccess from state as we can infer from
// presence or absence of user
// There is no need for a reset function as we can do this in our pending cases
// No need for isError or message as we can catch the AsyncThunkAction rejection
// in our component and we will have the error message there
const initialState = {
  customer: customer ? customer : null,
  isLoading: false,
}

// Register new user
export const registerCustomer = createAsyncThunk(
  'auth/register',
  async (customerData, thunkAPI) => {
    try {
      return await authService.registerCustomer(customerData)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Login user
export const loginCustomer = createAsyncThunk(
  'auth/login',
  async (customerData, thunkAPI) => {
    try {
      return await authService.loginCustomer(customerData)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Logout user
export const logoutCustomer = createAsyncThunk('auth/logout', async () => {
  await authService.logoutCustomer()
})

// NOTE: in cases of login or register pending or rejected then user will
// already be null so no need to set to null in these cases

export const authSlice = createSlice({
  name: 'customersAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.customer = action.payload
        state.isLoading = false
      })
      .addCase(registerCustomer.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(loginCustomer.pending, (state) => {
        state.isLoading = false
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.customer = action.payload
        state.isLoading = false
      })
      .addCase(loginCustomer.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(logoutCustomer.fulfilled, (state) => {
        state.customer = null
      })
  },
})

export default authSlice.reducer
