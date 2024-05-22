import React from 'react'
import screen from '../styling/images/f16_cover.png'

export const BlogDetails = () => {
  return (
    <div className='about'>
        <div className='container'>
            <div className='row rev'>
                <div className='images'>
                    <img className='img1' src={screen} alt="" />
                    <img className='img2' src={screen} alt="" />
                    <img className='img3' src={screen} alt="" />
                    <img className='img4' src={screen} alt="" />
                    <img className='img5' src={screen} alt="" />
                </div>
            </div>
        </div>     

    </div>
  )
}
