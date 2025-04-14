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
      width: '100%',
      height: '100%',
      position: "fixed",
      bottom: '0rem',
      borderRadius: 0,
      ease: "power2.inOut",
      duration: 2.5
    });
  
    gsap.globalTimeline.timeScale(1);
  }, []);
  

  return (
    
    <div
      ref={floatRef}
      id='float-comp'
      className="floatComp fixed z-50 bottom-7 left-1/2 transform -translate-x-1/2 w-[95%] rounded-2xl bg-gradient-to-r from-white/80 to-cyan-100/90 backdrop-blur-md px-4 py-2 flex flex-row items-center justify-between gap-x-3 md:gap-x-4 shadow-xl border border-white/30"
    >
      <img src={box} alt="" className="w-16 h-16 object-contain" />

      <h1 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
        Dołącz do zabawy już teraz!
      </h1>

      <button className="bg-[#1A7B88] px-3 py-1 rounded-md text-white text-xs md:text-sm shadow-xl hover:bg-[#155f68] transition duration-300 ease-in-out">
        🛒 Zamów teraz
      </button>
    </div>
  );
};

export default FloatComp;
