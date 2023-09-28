import { createSlice } from '@reduxjs/toolkit'

const initialState: DisplayLimitState = {
  qty: 9
}

const DisplayLimitSlise = createSlice({
  name: 'DisplayLimit',
  initialState,
  extraReducers: (builder)=> {
    builder
    .addCase()
  },
})