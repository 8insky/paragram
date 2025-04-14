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
      
    )
  }, [])
  

  return (
<div className="w-screen h-screen relative bg-white overflow-hidden">


<div className="absolute top-[10%] flex w-full">
  <div className="w-[100vh] h-[270px] rounded flex-shrink-0"></div>

  <h1

  className=" pl-10 w-full absolute flex flex-col justify-center align-middle text-[#F4845F] text-left text-5xl md:text-4xl font-bold leading-tight"
>
  <span className="block word drop-shadow-md">LEKKO,</span>
  <span className="block word drop-shadow-md">ZABAWNIE,</span>
  <span className="block word drop-shadow-md">KREATYWNIE</span>
  <span className="block word text-4xl drop-shadow-md">–     GRAMY?</span>
</h1>


</div>

<div className="absolute inset-0 mt-[190px] flex items-center justify-center pointer-events-none">
<img
  ref={boxRef}
  src={box}
  alt="Box"
  className="w-[380px]  max-w-[85%] h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] animate-float"
/>

</div>

<div className="absolute bottom-[-10%] w-full flex flex-col items-center justify-top">
  
  {/* <h1
    ref={text2Ref}
    className="text-2xl uppercase md:text-4xl font-extrabold text-[#3f3d56] drop-shadow-[0_2px_8px_rgba(100,100,150,0.2)] tracking-wide leading-tight mb-6 text-center"
  >
    Sprawdź teraz!
  </h1>

  
  <div
    className="w-[150px] h-[150px] rounded-full bg-[#1A7B88] text-white flex items-top justify-center text-6xl font-bold cursor-pointer shadow-lg hover:scale-105 transition-transform duration-300"
  >
    <a href='#about'>↓</a>
    
  </div> */}
</div>

</div>

  )
}

export default Hero
