import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import box2 from '../../assets/box2.png'
import box3 from '../../assets/box3.png'

const About = () => {
  const textRefs = useRef([])
  const boxRef = useRef(null)
  const section2Ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      textRefs.current,
      {
        x: -80,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'elastic.out(1, 0.6)',
      }
    )

    gsap.fromTo(
      boxRef.current,
      {
        y: 80,
        opacity: 0,
        scale: 0.7,
        rotate: -10,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        delay: 1.2,
        duration: 1,
        ease: 'back.out(1.7)',
      }
    )

    gsap.fromTo(
      section2Ref.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        delay: 2.5,
        duration: 1,
        ease: 'power2.out',
      }
    )
  }, [])

  return (
    <>
      <div id='about' className='w-screen h-[100vh] bg-[#F4845F] flex flex-col items-center justify-center overflow-hidden'>
        <h1 className='text-[#611c35] text-left text-4xl md:text-5xl font-bold leading-tight space-y-2 mb-10'>
          {['PONAD', '250', 'SŁÓW!', '– PO PROSTU ZAGRAJ!'].map((word, i) => (
            <span
              key={i}
              ref={(el) => (textRefs.current[i] = el)}
              className={`block word ${i === 3 ? 'text-2xl md:text-3xl' : ''} drop-shadow-md`}
            >
              {word}
            </span>
          ))}
        </h1>

        <img
          ref={boxRef}
          src={box2}
          alt="Box"
          className="w-[480px] max-w-[85%] h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] animate-float"
        />
      </div>


      <div
        ref={section2Ref}
        className="w-screen h-[100vh] bg-[#F4845F] flex items-left justify-center text-white text-center p-10"
      >
        <div className="max-w-3xl space-y-6">
          <img
            ref={boxRef}
            src={box3}
            alt="Box"
            className="w-[880px] max-w-[100%] text-left h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] animate-float"
          />
          <h2 className="text-3xl  text-left md:text-4xl font-extrabold drop-shadow-xl tracking-wide">
            DLA KAŻDEGO UMYSŁU
          </h2>
          <p className="text-lg text-left md:text-xl drop-shadow-md leading-relaxed">
            Twórz historie, buduj zdania, zaskocz siebie i innych. <br />
            Gra słów to nie tylko zabawa – to przygoda dla wyobraźni!
          </p>
        </div>
      </div>


<div className="relative w-full overflow-hidden leading-[0] rotate-180">
  <svg
    className="block w-full h-[80px] md:h-[100px]"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
  >

    <path
      fill="url(#fade)"
      d="M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z"
    />
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F4845F" stopOpacity="1" />
        <stop offset="100%" stopColor="#F4845F" stopOpacity="1" />
      </linearGradient>
    </defs>
  </svg>
</div>

    </>
  )
}

export default About
