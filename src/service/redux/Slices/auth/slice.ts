import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../../utils/axios'
import { TypeForLogUser, TypeForRegUser, UserResType } from '../../../../utils/types'

type authStateType = {
  user: UserResType | null;
  token: string | null;
  isLoading: boolean;
  status: string | null | {};
  admin: boolean;
  isAuth: boolean;
}

const initialState: authStateType = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  admin: false,
  isAuth: false,
}

interface UserResponse {
  user: UserResType | null;
  token: string;
  message: string;
  admin: boolean;
}


//Регистрация пользователя или админа
export const registerUser = createAsyncThunk<UserResponse, TypeForRegUser>(
  'auth/registerUser',
  async ({ username, nickname, password, adminpass, tel, ccn }) => {
    try {
      const { data } = await axios.post('/auth/register', { username, nickname, password, adminpass, tel, ccn })
      if (data.token) {
        window.localStorage.setItem('token', data.token)
      }
      return data
    } catch (error) {
      console.log(error.response.data.message)
      return error.response.data
    }
  }
)

//Авторизация пользователя или админа
export const loginUser = createAsyncThunk<UserResponse, TypeForLogUser>(
  'auth/loginUser',
  async ({ nickname, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', { nickname, password })
      if (!data) {
        throw new Error("Произашло ошибка при обработке данный. пожалюста попробуйт еще раз.");
      }
      if (data.token) {
        window.localStorage.setItem('token', data.token)
      }
      return data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)

//Определения авторизации
export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/auth/getMe')
      return data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.isLoading = false
      state.status = null
      state.admin = false
      state.token = null
      state.isAuth = false
    }
  },
  extraReducers(builder) {
    builder
      //register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = action.payload?.message
        state.isLoading = false
        state.token = action.payload?.token
        state.admin = action.payload?.admin
        state.isAuth = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = action.payload ? action.payload.message : null
      })
      //login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = action.payload?.message
        state.isLoading = false
        state.user = action.payload?.user
        state.admin = action.payload?.admin
        state.isAuth = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = action.payload ? action.payload : null
      })
      //getMe
      .addCase(getMe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = null
        state.isLoading = false
        state.user = action.payload?.user
        state.token = action.payload?.token
        state.isAuth = true
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = action.payload ? action.payload : null
        state.isLoading = false
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
