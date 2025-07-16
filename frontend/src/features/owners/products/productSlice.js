import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../../utils'

const initialState = {
  products: [],
}

// Get owner products
export const getOwnerProducts = createAsyncThunk(
  'products/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().ownersAuth.owner.token
      return await productService.getOwnerProducts(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const productSlice = createSlice({
  name: 'ownersProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOwnerProducts.fulfilled, (state, action) => {
      // loading state on getting products
      state.products = action.payload
    })
  },
})

export default productSlice.reducer
