import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setResetFilter: (state, action: PayloadAction<boolean>) => {
      state.value=action.payload
    }
  }
})