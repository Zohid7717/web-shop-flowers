import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface ResetFilterType {
  value: boolean
}

const initialState: ResetFilterType = {
  value: false
}

const resetFilterSlice = createSlice({
  name: 'resetFilter',
  initialState,
  reducers: {
    setResetFilter: (state) => {
      state.value=!state.value
    },
    setResetFilterTrue: (state) => {
      state.value=true
    },
    setResetFilterFalse: (state) => {
      state.value=false
    }
  }
})

export const { setResetFilter, setResetFilterTrue, setResetFilterFalse } = resetFilterSlice.actions

export const resetFilterResult = (state: RootState) => state.resetFilter.value

export default resetFilterSlice.reducer