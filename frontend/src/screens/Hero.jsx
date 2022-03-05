import React, { useEffect, useRef, useState} from 'react'
import {gsap} from 'gsap'

const Hero = () => {
  const [render, setRender] = useState(0)

  const boxRef = useRef()

  useEffect(() => {
    gsap.from(boxRef.current, { left: '-100%', duration: 1 });
    gsap.from('.hero-box-el', { opacity: 0, duration: 1, delay: 1, stagger: 1});
    gsap.from('.fa-arrow-down-long', {opacity: 0, top: '50%', duration: 1, delay: 4, ease: 'bounce'})
  },[render]);

  return (
    <div className='hero'>

      <div className='animation-box' ref={boxRef}>
        <div className='hero-box-el'>Invest in yourself</div>
        <div className='hero-box-el'>Get your tools work for you</div>
        <div className='hero-box-el'>Start journey now</div>
      </div>

      <img src="\images\hero.jpg" alt="hero" style={{width: '100%'}}/>
      <i class="fa-solid fa-arrow-down-long"></i>
    </div>
  )
}

export default Hero

// Zdjęcie autorstwa Ketut Subiyanto z Pexels