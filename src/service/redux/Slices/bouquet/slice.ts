import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { BouquetType } from '../../../../utils/types';
import axios from '../../../../utils/axios';
import { act } from 'react-dom/test-utils';

//тип для state
interface BouquetStateType {
  list: BouquetType[] | BouquetType | null
  loading: boolean
  status: string | null
  success: boolean
}

//тип отправляемого файла при создание букета
interface ReqToCreate {
  dataToString: string
}

//тип для получения по ID
interface ReqToGetById {
  id: number
}

//тин для ошибок
interface RejectedAction {
  type: string;
  error: any;
  payload: any;
}

interface ResToCreate {
  message: string,
  success: boolean
}


//создание
export const addBouquet = createAsyncThunk<ResToCreate, ReqToCreate>(
  'bouquet/addBouquet',
  async ({ dataToString }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/bouquet/addbouquet', { dataToString })
      if (!data) {
        throw new Error("Произашло ошибка обработке данных. попробуйте пойзже")
      }
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//получения одного букета
export const getBouquet = createAsyncThunk<BouquetType[], ReqToGetById>(
  'bouquet/getBouquet',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/bouquet/getbouquet/:${id}`)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const initialState: BouquetStateType = {
  list: null,
  loading: false,
  status: null,
  success: false
}

export const bouquetSlice = createSlice({
  name: 'bouquet',
  initialState,
  reducers: {
    setBouquetState(state) {
      state.success = false
      state.status = null
    }
  },
  extraReducers(builder) {
    builder
      //addBouquet
      .addCase(addBouquet.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(addBouquet.fulfilled, (state, action) => {
        state.loading = false
        state.status = action.payload.message
        state.success = action.payload.success
      })
      .addCase(addBouquet.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.status = action.error ? action.payload?.response.data.message : null
        state.success = action.payload.success
      })
  },
})

export default bouquetSlice.reducer

export const {setBouquetState}=bouquetSlice.actions