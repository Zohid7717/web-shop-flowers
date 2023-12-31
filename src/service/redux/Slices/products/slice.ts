import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';
import { items, price, priceItems } from '../../../filterFunc/filterFunc';

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

// филтрация
export const fetchByFilter = createAsyncThunk<BouquetType[], undefined, { rejectValue: string }>(
  'bouquet/fetchByFilter',
  async (_, { rejectWithValue, getState }) => {
    const categoryValue = (getState() as RootState).category.value
    const productPrice = (getState() as RootState).productPrice
    const productItems = (getState() as RootState).productItems
    let response
    if (categoryValue.length > 0) {
      response = await fetch(`http://localhost:3001/bouquets?category=${categoryValue}`)
    } else {
      response = await fetch(`http://localhost:3001/bouquets`)
    }
    const data = await response.json()
    if (!response.ok) {
      return rejectWithValue('Server error')
    }
    if (productItems.value.length > 0 && productPrice.value2 > 0) {
      return (priceItems(data, productPrice, productItems))
    } else if (productItems.value.length < 1 && productPrice.value2 > 0) {
      return price(data, productPrice)
    } else if (productItems.value.length > 0 && productPrice.value2 === 0) {
      return items(data, productItems)
    } else {
      return data
    }
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