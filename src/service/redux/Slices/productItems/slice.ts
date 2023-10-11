import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type ProductItemsType = string[]

const initialState: ProductItemsType = []

const productItemsSlice = createSlice({
  name: 'productItems',
  initialState,
  reducers: {
    setProductItems: (state, action: PayloadAction<string>) => {
      state.push(action.payload)
    },
    removeProductItems: (state, action: PayloadAction<string>) => {
      return state.filter(item => item !== action.payload)
    }
  }
})

export const { setProductItems, removeProductItems } = productItemsSlice.actions

export const productItemsResult = (state: RootState) => state.productItems

export default productItemsSlice.reducer