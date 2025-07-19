import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productOwnerService from './productOwnerService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../../utils'

const initialState = {
  productOwners: [],
}

// Get product owners
export const getCustomerProductOwners = createAsyncThunk(
  'product-owners/get',
  async (productName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().customersAuth.customer.token
      return await productOwnerService.getCustomerProductOwners(
        token,
        productName
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const productOwnerSlice = createSlice({
  name: 'customersProductOwners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomerProductOwners.fulfilled, (state, action) => {
      // loading state on getting productOwners
      state.productOwners = action.payload
    })
  },
})

export default productOwnerSlice.reducer
