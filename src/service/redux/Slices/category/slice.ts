import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface CategoryType {
  value: string | null
}

const initialState: CategoryType = {
  value: null
}
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    resetCategory: (state)=>{
      state.value = null
    }
  }
})

export const { setCategory, resetCategory } = categorySlice.actions

export const categoryResult = (state: RootState) => state.category.value

export default categorySlice.reducer