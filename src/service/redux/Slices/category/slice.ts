import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type categoryType = string[]

const initialState: categoryType = []

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.push(action.payload)
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      return state.filter(category => category !== action.payload)
    }
  }
})

export const { setCategory, removeCategory } = categorySlice.actions

export const categoryResult = (state: RootState) => state.category

export default categorySlice.reducer