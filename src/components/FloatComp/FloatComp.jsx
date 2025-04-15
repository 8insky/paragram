import React, { useRef } from 'react';
import box from '../../assets/box.png';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const FloatComp = ({ setMenuVisibility }) => {
  const floatRef = useRef(null);

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#breakComp',
        start: 'top 90%',
        end: 'bottom top',
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          setMenuVisibility(false); 
        }
      }
    });
  
    clipAnimation.to('#float-comp', {
      width: '100vw',
      height: '100vh',
      position: "fixed",
      flexDirection: 'column',
      bottom: '0rem',
      borderRadius: 0,
      scaleY: 1, // Dodajemy animację do skali
      opacity: 1, // Ustawiamy pełną widoczność
      ease: "power2.inOut",
      duration: 2.5
    });
  
    gsap.globalTimeline.timeScale(1);
  }, []);
  
  

  return (
    
    
    <div
      ref={floatRef}
      id='float-comp'
      className="floatComp fixed z-50 bottom-7 bg-amber-600 left-1/2 translate-[-50%] w-[95%] rounded-2xl bg-gradient-to-r from-white/80 to-cyan-100/90 backdrop-blur-md py-2 flex flex-row  shadow-xl border border-white/30"
    >
      <img src={box} alt="" className="w-16 h-16 object-contain" />

      <h1 className="text-lg flex-1 text-center justify-center flex sm:text-base w-[40%] md:text-lg font-semibold text-gray-800">
        Dołącz do zabawy!
      </h1>

      <button className=" px-3 py-1 rounded-md text-white text-4xl md:text-sm shadow-xl hover:bg-[#155f68] transition duration-300 ease-in-out">
        🛒 
      </button>
    </div>
  );
};

export default FloatComp;
