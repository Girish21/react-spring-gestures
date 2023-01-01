import * as React from 'react'

export function NavContainer({ children }: { children?: React.ReactNode }) {
  const headerRef = React.useRef<HTMLDivElement>(null)
  const compensatorRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const header = headerRef.current
    const compensator = compensatorRef.current

    if (!(header && compensator)) {
      return
    }

    function handleResize() {
      if (!(header && compensator)) {
        return
      }

      compensator.style.minHeight = `${header.offsetHeight}px`
    }
    handleResize()

    const resizeObserver = new ResizeObserver(handleResize)

    window.addEventListener('resize', handleResize)
    resizeObserver.observe(header)

    return () => {
      window.removeEventListener('resize', handleResize)
      resizeObserver.unobserve(header)
    }
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className='fixed top-0 left-0 right-0 p-2 lg:mx-auto lg:w-app-content lg:px-0'
      >
        <nav className='flex items-end md:items-center'>{children}</nav>
      </header>
      <div className='block' ref={compensatorRef} />
    </>
  )
}

export const NavPlaceholderChild = () => <div className='h-7' />
