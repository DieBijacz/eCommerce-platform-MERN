import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { Row } from 'react-bootstrap';

const Hero = () => {
  useEffect(() => {
    gsap.timeline()
      .from('.hero', { opacity: 0, ease: 'power2.out' })
      .from('.animated', { opacity: 0, stagger: .5 })
  }, []);

  return (
    <Row className='hero-high'>
      <div className='hero'>
        <div className='slogan'>
          <div className='animated' style={{ fontSize: '10vw', letterSpacing: '3vw', fontWeight: 'bold' }}>DEEPER</div>
          <div className='animated' style={{ fontSize: '6vw', letterSpacing: '1vw' }}>CONCENTRATION</div>
        </div>

        <img src="\images\hero.jpg" alt="hero" style={{ width: '100%' }} />
      </div>
    </Row>
  )
}

export default Hero

// Zdjęcie autorstwa Ketut Subiyanto z Pexels