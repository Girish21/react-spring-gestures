import { NavLink as RRNavLink, NavLinkProps } from 'react-router-dom'
import { clsx } from '../utils'

function NavLink(props: Omit<NavLinkProps, 'className'>) {
  return (
    <RRNavLink
      {...props}
      className={({ isActive }) =>
        clsx(
          'px-3 py-2 text-lg text-gray-900 transition-colors duration-300 ease-out hover:rounded hover:bg-gray-100',
          isActive && 'rounded bg-gray-100',
        )
      }
    />
  )
}

export function Nav() {
  return (
    <header className='mx-auto w-app-content py-2'>
      <nav>
        <ul className='flex flex-row gap-6'>
          <li>
            <NavLink to='simple-drag'>Simple Drag</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
