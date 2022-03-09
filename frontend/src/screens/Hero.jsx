import React, { useEffect, useRef} from 'react'
import {gsap} from 'gsap'

const Hero = () => {
  useEffect(() => {
    gsap.timeline()
      .from('.hero', {opacity: 0, duration: 1, ease: 'power2.out'})
      .from('.hero-box-el', { opacity: 0, duration: 1, stagger: .5})
  },[]);

  return (
    <div className='hero'>

      <div className='animation-box'>
        <div className='hero-box-el'>MAKE</div>
        <div className='hero-box-el'>YOUR TOOLS</div>
        <div className='hero-box-el'>WORK FOR YOU</div>
      </div>

      <img src="\images\hero.jpg" alt="hero" style={{width: '100%'}}/>
    </div>
  )
}

export default Hero

// Zdjęcie autorstwa Ketut Subiyanto z Pexels