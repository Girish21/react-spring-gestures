import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components'
import './index.css'
import IndexPage from './pages/index'
import SimpleDrag from './pages/simple-gesture'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <React.Suspense>
                <IndexPage />
              </React.Suspense>
            }
          />
          <Route path='simple-drag' element={<SimpleDrag />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
