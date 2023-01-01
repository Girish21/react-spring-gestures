import { useScroll, animated, useSpring } from '@react-spring/web'

function ScrollEffect() {
  const headlineSectionOne = useSpring(() => ({
    y: '0%',
  }))
  const headlineSectionTwo = useSpring(() => ({
    opacity: 0,
  }))
  const headlineSectionThree = useSpring(() => ({
    opacity: 0,
  }))
  const { y } = useSpring({
    from: { y: 0 },
    to: { y: 10 },
    loop: { reverse: true },
    delay: -100,
    config: {
      mass: 5,
      tension: 30,
      friction: 20,
    },
  })
  const [{ x, y: containerY }, apiX] = useSpring(() => ({
    x: '-50%',
    y: '-50%',
  }))

  const { scrollYProgress } = useScroll({
    onChange: ({ value }) => {
      if (value.scrollYProgress > 0.2) {
        headlineSectionOne[1].start({ y: '-100%' })
      } else if (value.scrollYProgress < 0.25) {
        headlineSectionOne[1].start({ y: '0%' })
      }

      if (value.scrollYProgress > 0.84) {
        apiX.start({ x: '-50%' })
      } else if (value.scrollYProgress > 0.48) {
        apiX.start({
          x: '-200%',
          config: {
            tension: 50,
          },
        })
      } else if (value.scrollYProgress > 0.25) {
        apiX.start({ x: '100%' })
      } else if (value.scrollYProgress < 0.25) {
        apiX.start({ x: '-50%' })
      }

      if (value.scrollYProgress > 0.47) {
        headlineSectionTwo[1].start({ opacity: 0 })
      } else if (value.scrollYProgress > 0.27) {
        headlineSectionTwo[1].start({ opacity: 1 })
      } else if (value.scrollYProgress < 0.27 || value.scrollYProgress > 0.47) {
        headlineSectionTwo[1].start({ opacity: 0 })
      }

      if (value.scrollYProgress > 0.84) {
        headlineSectionThree[1].start({ opacity: 0 })
      } else if (value.scrollYProgress > 0.59) {
        headlineSectionThree[1].start({ opacity: 1 })
      } else if (value.scrollYProgress <= 0.59) {
        headlineSectionThree[1].start({ opacity: 0 })
      }
    },
  })

  return (
    <div className='relative mx-auto min-h-[400vh] w-app-content'>
      <div className='h-screen'>
        <div className='sticky top-20'>
          <h1 className='overflow-hidden text-center font-sans text-7xl font-bold text-blue-500'>
            <animated.span className='block' style={headlineSectionOne[0]}>
              Hello World
            </animated.span>
          </h1>
        </div>
      </div>
      <div className='h-screen md:w-[40ch] lg:w-[60ch]'>
        <div className='sticky top-52'>
          <h2 className='overflow-hidden text-left font-sans text-5xl font-bold text-slate-800'>
            <animated.span style={headlineSectionTwo[0]} className='block'>
              This is a scroll card
            </animated.span>
          </h2>
          <animated.p
            style={headlineSectionTwo[0]}
            className='mt-10 overflow-hidden text-left font-sans text-lg text-slate-700'
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui
            obcaecati iusto placeat et explicabo sequi libero aperiam debitis,
            tenetur quaerat ad veritatis beatae tempora. Ipsam illo neque
            mollitia autem omnis.
          </animated.p>
        </div>
      </div>
      <div className='ml-auto h-screen md:w-[40ch] lg:w-[60ch]'>
        <div className='sticky top-52'>
          <h2 className='overflow-hidden text-left font-sans text-5xl font-bold text-slate-800'>
            <animated.span style={headlineSectionThree[0]} className='block'>
              This is a scroll card
            </animated.span>
          </h2>
          <animated.p
            style={headlineSectionThree[0]}
            className='mt-10 overflow-hidden text-left font-sans text-lg text-slate-700'
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui
            obcaecati iusto placeat et explicabo sequi libero aperiam debitis,
            tenetur quaerat ad veritatis beatae tempora. Ipsam illo neque
            mollitia autem omnis.
          </animated.p>
        </div>
      </div>
      <animated.div
        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        style={{ perspective: 1200, x, y: containerY }}
      >
        <animated.div
          className='h-32 w-32 rounded-3xl bg-violet-300 drop-shadow-2xl md:h-44 md:w-44 lg:h-64 lg:w-64'
          style={{
            y,
            rotateY: scrollYProgress.to(
              [0, 0.25, 0.5, 0.75, 1],
              [0, 30, 0, -30, 0],
            ),
            rotateX: scrollYProgress.to(
              [0, 0.25, 0.5, 0.75, 1],
              [30, 0, -30, 0, 30],
            ),
          }}
        />
      </animated.div>
    </div>
  )
}

export default ScrollEffect
