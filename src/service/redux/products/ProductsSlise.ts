import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//создаем типы для Bouquet
interface BouquetType {
  id: number;
  name: string;
  category: string;
  position: string;
  composition: string[];
  size: {
    size_name: string;
    price: number;
  }[];
  image: string;
}

//создаем типы для state
type BouquetStateType = {
  list: BouquetType[];
  loading: boolean;
  error: string | null;
}

//создаем и типизируем асинхронную функцию для получения данных
export const fetchBouquet = createAsyncThunk<BouquetType[], undefined, { rejectValue: string }>(
  'bouquet/fetchBouquet',
  async function (_, {rejectWithValue}) {
    const response = await fetch()
  }
)
