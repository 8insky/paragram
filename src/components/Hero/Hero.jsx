import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import box from '../../assets/box.png'

const Hero = () => {
  const boxRef = useRef(null)

  useEffect(() => {
  
    const words = gsap.utils.toArray('.word')
    gsap.set(words, {
      opacity: 0,
      x: -50,
    })

    const tl = gsap.timeline({ delay: 0.0 })

    tl.to(words, {
      x: 0,
      opacity: 1,
      duration: 1.3,
      ease: 'power2.out',
    })


    gsap.set(boxRef.current, {
        opacity: 0,
        y: 50, 
        scale: 0.8, 
        rotation: -15 
    });

    tl.to(
      boxRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'power4.out',
      },
      '-=0.5' 
    )
  }, [])

  return (
    
    <div className="w-screen h-screen relative bg-white overflow-hidden">

      
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none"
        style={{
          backgroundImage: 'url("/group.webp")',
          filter: 'blur(2px) brightness(0.8)',
          zIndex: 0, 
        }}
      />

      
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" 
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
          zIndex: 1, 
        }}
      />

  
      <div className="absolute top-[10%] flex w-full z-10"> 
        <div className="w-[100vh] h-[270px] rounded flex-shrink-0"></div>
        <h1
          className="pl-10 w-full absolute flex flex-col justify-center align-middle text-[#F4845F] text-left text-5xl md:text-4xl font-bold leading-tight z-20" // Upewnij się, że tekst jest nad gradientem
        >
          <span className="block word drop-shadow-md">LEKKO,</span>
          <span className="block word drop-shadow-md">ZABAWNIE,</span>
          <span className="block word drop-shadow-md">KREATYWNIE</span>
          <span className="block word text-4xl drop-shadow-md">– GRAMY?</span>
        </h1>
      </div>

    
      <div className="absolute inset-0 mt-[190px] flex items-center justify-center pointer-events-none z-10"> 
        <img
          ref={boxRef}
          src={box}
          alt="Box"
          className="w-[380px] max-w-[85%] h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] animate-float z-20" 
        />
      </div>
    </div>
  )
}

export default Hero