import { Suspense } from "react"
import { Routes, Route } from "react-router-dom";
import MainLayout from './component/layout/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import RegAdmin from './pages/RegAdmin/RegAdmin';

import './App.scss'


function App() {

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
