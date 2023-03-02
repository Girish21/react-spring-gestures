import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components'
import './index.css'
import CardGesture from './pages/card-gesture'
import PageIndicator from './pages/page-indicator'
import DraggableCarousel from './pages/draggable-carousel'
import IndexPage from './pages/index'
import NativeSlider from './pages/native-slider'
import ResizablePanels from './pages/resizable-panels'
import ScrollEffect from './pages/scroll-effect'
import SimpleDrag from './pages/simple-gesture'
import CardCarousel from './pages/card-carousel'
import ScrollCarousel from './pages/scroll-carousel'
import Numpad from './pages/numpad'
import SimpleDragIndicator from './pages/simple-drag-indicator'
import CardFlip from './pages/card-flip'

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
            path='scroll-effect'
            element={
              <React.Suspense fallback={null}>
                <ScrollEffect />
              </React.Suspense>
            }
          />
          <Route
            path='card-gesture'
            element={
              <React.Suspense fallback={null}>
                <CardGesture />
              </React.Suspense>
            }
          />
          <Route
            path='indicators'
            element={
              <React.Suspense fallback={null}>
                <PageIndicator />
              </React.Suspense>
            }
          />
          <Route
            path='card-carousel'
            element={
              <React.Suspense fallback={null}>
                <CardCarousel />
              </React.Suspense>
            }
          />
          <Route
            path='scroll-carousel'
            element={
              <React.Suspense fallback={null}>
                <ScrollCarousel />
              </React.Suspense>
            }
          />
          <Route
            path='numpad'
            element={
              <React.Suspense fallback={null}>
                <Numpad />
              </React.Suspense>
            }
          />
          <Route
            path='simple-drag-indicator'
            element={
              <React.Suspense fallback={null}>
                <SimpleDragIndicator />
              </React.Suspense>
            }
          />
          <Route
            path='card-flip'
            element={
              <React.Suspense fallback={null}>
                <CardFlip />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
