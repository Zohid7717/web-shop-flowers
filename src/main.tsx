import React from 'react'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './service/redux/store.ts';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
