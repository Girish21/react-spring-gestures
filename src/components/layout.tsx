import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { NavContainer, NavPlaceholderChild } from './nav-container'
import Nav from './nav.lazy'

export function Layout() {
  return (
    <main className='flex h-full flex-col gap-8'>
      <React.Suspense
        fallback={
          <NavContainer>
            <NavPlaceholderChild />
          </NavContainer>
        }
      >
        <Nav />
      </React.Suspense>
      <Outlet />
    </main>
  )
}
