import { configureStore } from '@reduxjs/toolkit'
import DisplayLimitSlice from './Slices/displayLimit/slice'
import dataProducts from './Slices/products/slice'
import category from './Slices/category/slice'
import productItems from './Slices/productItems/slice'
import inputValue from './Slices/inputValue/slice'
import productPrice from './Slices/productPrice/slice'

export const store = configureStore({
  reducer: {
    displayLimit: DisplayLimitSlice,
    dataProducts,
    category,
    productItems,
    inputValue,
    productPrice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch