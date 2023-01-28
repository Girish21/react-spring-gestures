import { a, useTransition } from '@react-spring/web'
import * as React from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { NavContainer, NavPlaceholderChild } from './nav-container'
import Nav from './nav.lazy'

const Child = () => {
  const location = useLocation()

  const transition = useTransition(location, {
    from: { opacity: 0, y: -32 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 32 },
    exitBeforeEnter: true,
  })

  return (
    <>
      {transition(style => (
        <a.div className='flex-1' style={style}>
          <AnimatedOutlet />
        </a.div>
      ))}
    </>
  )
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
