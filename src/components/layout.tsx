import { Outlet } from 'react-router-dom'
import { Nav } from './nav'

export function Layout() {
  return (
    <main className='flex h-full flex-col gap-8'>
      <Nav />
      <Outlet />
    </main>
  )
}
