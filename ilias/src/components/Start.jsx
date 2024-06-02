import React from 'react'
import { animated, useSpring } from '@react-spring/web'
import screen from '../styling/images/f16_cover.png'


export const Start = () => {
  const springs = useSpring({
    from: { x: -100 },
    to: { x: 100 },
  })

  return (
    <animated.div style={{
      ...springs,
      width: "50%"
    }}
      className='start'
    >
      <h1>EVERYTHING STARTS WITH THE
        <span style={{ color: 'lightblue' }}> MISSION</span>
      </h1>

      <p>
        The ILIAS Defense Platform is a commercial off-the-shelf
        software suite specifically designed to support the core
        processes of Defense Organizations. Since the mid-1990s, the
        platform has been continuously enhanced and refined to
        meet the needs and specifications of Defense organizations.
      </p>

      <img src={screen} alt="" />
    </animated.div>
  )
}




