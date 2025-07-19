import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../../utils'

// Get user from localstorage
const owner = JSON.parse(localStorage.getItem('owner'))

// NOTE: remove isSuccess from state as we can infer from
// presence or absence of user
// There is no need for a reset function as we can do this in our pending cases
// No need for isError or message as we can catch the AsyncThunkAction rejection
// in our component and we will have the error message there
const initialState = {
  owner: owner ? owner : null,
  isLoading: false,
}

// Register new user
export const registerOwner = createAsyncThunk(
  'auth/register',
  async (ownerData, thunkAPI) => {
    try {
      return await authService.registerOwner(ownerData)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Login user
export const loginOwner = createAsyncThunk(
  'auth/login',
  async (ownerData, thunkAPI) => {
    try {
      return await authService.loginOwner(ownerData)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Logout user
export const logoutOwner = createAsyncThunk('auth/logout', async () => {
  await authService.logoutOwner()
})

// Get Me Owner user
export const getMeOwner = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().ownersAuth.owner.token
    return await authService.getMeOwner(token)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

// Change Password user
export const changePasswordOwner = createAsyncThunk(
  'auth/password',
  async (ownerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().ownersAuth.owner.token
      return await authService.changePasswordOwner(ownerData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Save Account Customer user
export const saveAccountDetailsOwner = createAsyncThunk(
  'auth/save',
  async (ownerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().ownersAuth.owner.token
      return await authService.saveAccountDetailsOwner(ownerData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// NOTE: in cases of login or register pending or rejected then user will
// already be null so no need to set to null in these cases

export const authSlice = createSlice({
  name: 'ownersAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerOwner.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerOwner.fulfilled, (state, action) => {
        state.owner = action.payload
        state.isLoading = false
      })
      .addCase(registerOwner.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(loginOwner.pending, (state) => {
        state.isLoading = false
      })
      .addCase(loginOwner.fulfilled, (state, action) => {
        state.owner = action.payload
        state.isLoading = false
      })
      .addCase(loginOwner.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(logoutOwner.fulfilled, (state) => {
        state.owner = null
      })
      .addCase(getMeOwner.fulfilled, (state, action) => {
        state.owner = action.payload
        state.isLoading = false
      })
      .addCase(saveAccountDetailsOwner.pending, (state) => {
        state.isLoading = true
      })
      .addCase(saveAccountDetailsOwner.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(saveAccountDetailsOwner.fulfilled, (state, action) => {
        state.owner = action.payload
        state.isLoading = false
      })
      .addCase(changePasswordOwner.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(changePasswordOwner.fulfilled, (state) => {
        state.isLoading = false
      })
  },
})

export default authSlice.reducer
