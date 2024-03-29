import { a, useTransition } from '@react-spring/web'
import * as React from 'react'
import { Outlet, useLocation, useOutlet } from 'react-router-dom'
import { NavContainer, NavPlaceholderChild } from './nav-container'
import Nav from './nav.lazy'
import { NavLinks } from './nav'

const Child = () => {
  const location = useLocation()

  const transition = useTransition(location.key, {
    from: { opacity: 0, y: -32 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 32 },
    exitBeforeEnter: true,
    initial: null,
  })

  return (
    <>
      {transition(style => (
        <a.div className='flex-1' style={style}>
          <AnimatedOutlet />
        </a.div>
      ))}
      <PageTitle />
    </>
  )
}

const PageTitle = () => {
  const location = useLocation()

  React.useEffect(() => {
    const firstSegment = location.pathname.split('/').filter(Boolean)[0]
    const activeLink = NavLinks.find(link => link.path === firstSegment)

    document.title = activeLink?.label ?? 'Home'
  }, [location])

  return null
}

const AnimatedOutlet = () => {
  const [outlet] = React.useState(useOutlet())

  return outlet
}

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
      <Child />
    </main>
  )
}
