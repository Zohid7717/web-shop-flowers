import { configureStore } from '@reduxjs/toolkit'
import DisplayLimitSlice from './Slices/displayLimit/slice'
import dataProducts from './Slices/products/slise'
import category from './Slices/category/slice'

export const store = configureStore({
  reducer: {
    displayLimit: DisplayLimitSlice,
    dataProducts,
    category
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch