import { Suspense } from "react"
import { Routes, Route } from "react-router-dom";
import MainLayout from './component/layout/MainLayout/MainLayout';
import Home from './pages/Home/Home';

import './App.css'


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
          }/>
        </Route>
      </Routes>
    </>
  )
}

export default App
