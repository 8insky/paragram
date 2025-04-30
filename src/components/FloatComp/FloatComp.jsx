import React, { useRef } from 'react';
import box from '../../assets/box.png';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Object from '../Object/Object';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const FloatComp = ({ setMenuVisibility }) => {
  const floatRef = useRef(null);

  useGSAP(() => {
    gsap.set(floatRef.current, { opacity: 0, y: 100, pointerEvents: 'none' });

    gsap.to(floatRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top+=300 top',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      pointerEvents: 'auto',
      duration: 1,
      delay: 1,
      ease: 'power2.out',
    });

    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#breakComp',
        start: 'top 30%',
        end: 'bottom top',
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          setMenuVisibility(false);
        },
      },
    });

    clipAnimation.to('#float-comp', {
      width: '100%',
      height: '100%',
      position: 'fixed',
      bottom: '0rem',
      borderRadius: 0,
      ease: 'power2.inOut',
      duration: 2.5,
    });
  }, []);

  return (
    <div
      ref={floatRef}
      id="float-comp"
      className="floatComp fixed z-50 h-16 bottom-7 left-1/2 transform -translate-x-1/2 w-[95%] max-w-[600px] rounded-2xl bg-gradient-to-r from-white/80 to-cyan-100/90 backdrop-blur-md flex align-middle shadow-xl border border-white/30"
    >
      
        <Object />
      
     
    </div>
  );
};

export default FloatComp;
