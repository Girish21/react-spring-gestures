import * as React from 'react'

export function NavContainer({ children }: { children?: React.ReactNode }) {
  return (
    <header className='p-2 lg:mx-auto lg:w-app-content lg:px-0'>
      <nav className='flex items-end md:items-center'>{children}</nav>
    </header>
  )
}

export const NavPlaceholderChild = () => <div className='h-7' />
