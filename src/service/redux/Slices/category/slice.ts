import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface CategoryType {
  value: string
}

const initialState: CategoryType = {
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