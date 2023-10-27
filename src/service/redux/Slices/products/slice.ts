import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';
import { categoryPriceItems } from '../../../filterFunc/filterFunc';

//создаем типы для Bouquet
export interface BouquetType {
  id: number;
  name: string;
  category: string;
  date: string;
  composition: string[];
  size: {
    size_name: string;
    price: number;
  }[];
  count: number;
  status: string
  image: string;
}

//создаем типы для state
export type BouquetStateType = {
  list: BouquetType[];
  loading: boolean;
  error: string | null;
}

//создаем и типизируем асинхронную функцию для получения данных
export const fetchBouquet = createAsyncThunk<BouquetType[], undefined, { rejectValue: string }>(
  'bouquet/fetchBouquet',
  async function (_, { rejectWithValue, getState }) {
    const displayLimit = (getState() as RootState).displayLimit.value
    const response = await fetch(`http://localhost:3001/bouquets?_limit=${displayLimit}`)
    if (!response.ok) {
      return rejectWithValue('Server error')
    }
    const data = await response.json()
    return data
  }
)
//получаенм продук по категориям
export const fetchBouquetFromCat = createAsyncThunk<BouquetType[], undefined, { rejectValue: string }>(
  'bouquet/fetchBouquetFromCat',
  async (_, { rejectWithValue, getState }) => {
    const categoryValue = (getState() as RootState).category.value
    const response = await fetch(`http://localhost:3001/bouquets?category=${categoryValue}`)
    if (!response.ok) {
      return rejectWithValue('Server error')
    }
    const data = await response.json()
    return data
  }
)

//получаем продукты по названию
export const fetchBouquetFromName = createAsyncThunk<BouquetType[], undefined, { rejectValue: string }>(
  'bouquet/fetchBouquetFromName',
  async (_, { rejectWithValue, getState }) => {
    const inputValue = (getState() as RootState).inputValue.value
    const response = await fetch(`http://localhost:3001/bouquets?name_like=${inputValue}`)
    if (!response.ok) {
      return rejectWithValue('Server error')
    }
    const data = await response.json()
    return data
  }
)

//получения всех продуктов
export const fetchAllBouquet = createAsyncThunk<BouquetType[], undefined, { rejectValue: string }>(
  'bouquet/fetchAllBouquet',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3001/bouquets`)
    if (!response.ok) {
      return rejectWithValue('Server error')
    }
    const data = await response.json()
    return data
  }
)

// филтрация по цене
export const fetchByFilter = createAsyncThunk<BouquetType[], undefined, { rejectValue: string }>(
  'bouquet/fetchByFilter',
  async (_, { rejectWithValue, getState }) => {
    const categoryValue = (getState() as RootState).category.value
    const productPrice = (getState() as RootState).productPrice
    const productItems = (getState() as RootState).productItems
    const response = await fetch(`http://localhost:3001/bouquets?category=${categoryValue}`)
    const data = await response.json()
    if (!response.ok) {
      return rejectWithValue('Server error')
    }
    return (categoryPriceItems(data, productPrice, productItems))
  }
)

const initialState: BouquetStateType = {
  list: [],
  loading: false,
  error: null
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBouquet.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBouquet.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
      .addCase(fetchBouquetFromCat.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBouquetFromCat.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
      .addCase(fetchBouquetFromName.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBouquetFromName.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
      .addCase(fetchAllBouquet.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllBouquet.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
      .addCase(fetchByFilter.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchByFilter.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export default productSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}