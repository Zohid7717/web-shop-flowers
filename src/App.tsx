import React ,{ Suspense, useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import MainLayout from './component/layout/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import RegAdmin from './pages/RegAdmin/RegAdmin';
import { useAppDispatch } from './service/redux/hooks/hooks';
import { getMe } from './service/redux/Slices/auth/slice';

import './App.scss'

//Lazy loading
const RegUserPage= React.lazy(()=>import('./pages/RegUser/RegUser'))
const LogUserPage= React.lazy(()=>import('./pages/AuthUser/AuthUser'))
const CabinetUserPage= React.lazy(()=>import('./pages/Cabinet/Cabinet'))

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMe())
  },[])
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={
            <Suspense fallback={
              <p>Loading ...</p>
            }>
              <Home/>
            </Suspense>
          } />
          <Route path='regadmin' element={
            <Suspense fallback={
              <p>Loading ...</p>
            }>
              <RegAdmin/>
            </Suspense>
          } />
          <Route path='user/register' element={
            <Suspense fallback={
              <p>Loading ...</p>
            }>
              <RegUserPage/>
            </Suspense>
          } />
          <Route path='user/login' element={
            <Suspense fallback={
              <p>Loading ...</p>
            }>
              <LogUserPage/>
            </Suspense>
          } />
          <Route path='user' element={
            <Suspense fallback={
              <p>Loading ...</p>
            }>
              <CabinetUserPage/>
            </Suspense>
          } />
          <Route path='*' element={
            <Suspense fallback={
              <p>Loading ...</p>
            }>
              <NotFound/>
            </Suspense>
          }/>
        </Route>
      </Routes>
    </>
  )
}

export default App
