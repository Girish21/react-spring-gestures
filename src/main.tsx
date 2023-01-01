import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components'
import './index.css'
import DraggableCarousel from './pages/draggable-carousel'
import IndexPage from './pages/index'
import NativeSlider from './pages/native-slider'
import ResizablePanels from './pages/resizable-panels'
import ScrollEffect from './pages/scroll-effect'
import SimpleDrag from './pages/simple-gesture'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <React.Suspense fallback={null}>
                <IndexPage />
              </React.Suspense>
            }
          />
          <Route
            path='simple-drag'
            element={
              <React.Suspense fallback={null}>
                <SimpleDrag />
              </React.Suspense>
            }
          />
          <Route
            path='resizable-panels'
            element={
              <React.Suspense fallback={null}>
                <ResizablePanels />
              </React.Suspense>
            }
          />
          <Route
            path='draggable-carousel'
            element={
              <React.Suspense fallback={null}>
                <DraggableCarousel />
              </React.Suspense>
            }
          />
          <Route
            path='native-slider'
            element={
              <React.Suspense fallback={null}>
                <NativeSlider />
              </React.Suspense>
            }
          />
          <Route
            path='scroll-cards'
            element={
              <React.Suspense fallback={null}>
                <ScrollEffect />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
