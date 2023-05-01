import * as Portal from '@radix-ui/react-portal'
import {
  animated,
  useChain,
  useSpringRef,
  useTransition,
} from '@react-spring/web'
import * as React from 'react'
import {
  NavLink as RRNavLink,
  NavLinkProps,
  useLocation,
} from 'react-router-dom'
import { RemoveScroll } from 'react-remove-scroll'
import svg from '../assets/sprites.svg'
import { clsx, generateSvg } from '../utils'
import { NavContainer } from './nav-container'

const HamburgerSvg = generateSvg(svg, 'hamburger')
const CloseSvg = generateSvg(svg, 'close')

export const NavLinks = [
  { path: '/', label: 'Home' },
  { path: 'wheel-input', label: 'Wheel Input' },
  { path: 'indicators', label: 'Indicators' },
  { path: 'card-carousel', label: 'Card Carousel' },
  { path: 'scroll-carousel', label: 'Scroll Carousel' },
  { path: 'draggable-carousel', label: 'Draggable Carousel' },
  { path: 'native-slider', label: 'Native Slider' },
  { path: 'scroll-effect', label: 'Scroll Effect' },
  { path: 'simple-drag', label: 'Simple Drag' },
  { path: 'card-gesture', label: 'Card Gesture' },
  { path: 'resizable-panels', label: 'Resizable Panels' },
  { path: 'numpad', label: 'Numpad' },
  { path: 'simple-drag-indicator', label: 'Simple Drag Indicator' },
  { path: 'card-flip', label: 'Card Flip' },
] as const

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

function MobileNav() {
  const [showNav, setShowNav] = React.useState<'open' | 'close'>('close')

  const location = useLocation()

  const transitionRef = useSpringRef()
  const trailRef = useSpringRef()

  const popperTransition = useTransition(showNav === 'open' ? true : null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, config: { friction: 40, mass: 1, tension: 150 } },
    ref: transitionRef,
  })
  const itemsTransition = useTransition(showNav === 'open' ? NavLinks : [], {
    trail: 300 / NavLinks.length,
    from: { opacity: 0, x: '-5%' },
    enter: { opacity: 1, x: '0%' },
    leave: { opacity: 0, x: '15%' },
    ref: trailRef,
  })

  useChain(
    showNav === 'open' ? [transitionRef, trailRef] : [trailRef, transitionRef],
    showNav === 'open' ? [0, 0.5] : [0, 0.3],
  )

  React.useEffect(() => {
    setShowNav('close')
  }, [location])

  return (
    <>
      <button
        onClick={() => setShowNav('open')}
        className='ml-auto h-8 w-8 p-1'
        aria-label='Open navigation'
      >
        <HamburgerSvg aria-hidden className='h-full w-full text-black' />
      </button>
      <Portal.Root>
        {popperTransition((style, visible) =>
          visible ? (
            <RemoveScroll>
              <animated.div style={style} className='fixed inset-0 z-10'>
                <div className='h-full w-full overflow-auto bg-white px-8 pt-24 pb-8'>
                  <ul className='flex flex-col gap-y-8 md:items-center'>
                    {itemsTransition((style, item) =>
                      item ? (
                        <animated.li style={style} key={item.path}>
                          <NavLink to={item.path}>{item.label}</NavLink>
                        </animated.li>
                      ) : null,
                    )}
                  </ul>
                  <div className='absolute top-2 right-2'>
                    <button
                      onClick={() =>
                        setShowNav(state =>
                          state === 'close' ? 'open' : 'close',
                        )
                      }
                      className='h-8 w-8 p-2'
                      aria-label='Close navigation'
                    >
                      <CloseSvg
                        aria-hidden
                        className='h-full w-full text-black'
                      />
                    </button>
                  </div>
                </div>
              </animated.div>
            </RemoveScroll>
          ) : null,
        )}
      </Portal.Root>
    </>
  )
}

function Nav() {
  return (
    <NavContainer>
      <MobileNav />
    </NavContainer>
  )
}

export default Nav
