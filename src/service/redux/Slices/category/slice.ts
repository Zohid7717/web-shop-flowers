import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface categoryType {
  value: string
}

const initialState: categoryType = {
  value: ''
}
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setCategory } = categorySlice.actions

export const categoryResult = (state: RootState) => state.category.value

export default categorySlice.reducer