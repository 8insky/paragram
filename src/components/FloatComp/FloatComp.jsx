import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const FloatComp = ({ setMenuVisibility }) => {
  const floatRef = useRef(null);
  const modelRef = useRef(null);
  const textRef = useRef(null);
  const cartRef = useRef(null);
  const expandedContentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useGSAP(() => {
    // Initial setup - hidden and below viewport
    gsap.set(floatRef.current, { 
      opacity: 0, 
      y: 50, 
      pointerEvents: 'none',
      width: '95%',
      height: '4rem',
      borderRadius: '1rem',
      bottom: '1.75rem',
      left: '50%',
      x: '-50%',
      position: 'fixed'
    });

    // First animation - appear on scroll with a subtle fade in
    gsap.to(floatRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top+=300 top',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      pointerEvents: 'auto',
      duration: 0.5,
      ease: 'power2.out',
    });

    // Create references to model and text for smoother transitions
    const model = modelRef.current;
    const text = textRef.current;
    const cart = cartRef.current;

    // Create the full-screen expansion animation with simpler, faster transitions
    const expandAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#breakComp',
        start: 'top 40%',
        end: 'top top',
        scrub: 0.6, // Faster scrub for quicker response
        pin: true,
        pinSpacing: false, // Reduced pinning for faster rendering
        onEnter: () => {
          setMenuVisibility(false);
          setIsExpanded(true);
        },
        onLeaveBack: () => {
          setMenuVisibility(true);
          setIsExpanded(false);
        }
      },
    });

    // Simplified animation sequence - more efficient
    expandAnimation
      // First phase - expand container
      .to(floatRef.current, {
        width: '100%',
        height: '100vh',
        borderRadius: 0,
        bottom: 0,
        ease: 'power2.inOut',
        duration: 0.8,
      })
      // Simplified transition for minimized elements
      .to([model, text, cart], {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.in',
      }, "-=0.6")
      // Reveal expanded content
      .to(expandedContentRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out',
      }, "-=0.1");

  }, []);

  // Handle manual expand on click
  const handleClick = () => {
    if (!isExpanded) {
      // Manually trigger scroll to the breakComp section with smooth scroll
      const breakComp = document.getElementById('breakComp');
      if (breakComp) {
        window.scrollTo({
          top: breakComp.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div
      ref={floatRef}
      id="float-comp"
      onClick={handleClick}
      className={`fixed z-50 bg-gradient-to-r from-white/80 to-cyan-100/90 backdrop-blur-md shadow-xl border border-white/30 ${
        isExpanded ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      {/* Minimized state content */}
      <div 
        className={`flex items-center justify-between px-4 h-full transition-opacity duration-300 ${
          isExpanded ? 'opacity-0 pointer-events-none absolute w-full' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Colored div instead of 3D model */}
          <div ref={modelRef} className="h-8 w-8 rounded-md bg-green-500 flex items-center justify-center">
            {/* Simple icon or leave empty */}
          </div>
          
          {/* CTA Text */}
          <div ref={textRef} className="text-sm font-medium text-gray-800">
            Check out our new product!
          </div>
        </div>
        
        {/* Cart button */}
        <div ref={cartRef} className="w-6 h-6 rounded-md bg-yellow-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>

      {/* Expanded state content - simplified for better performance */}
      <div 
        ref={expandedContentRef}
        className={`w-full h-full flex opacity-0 transition-opacity duration-300 ${
          isExpanded ? 'flex' : 'hidden'
        }`}
      >
        {/* Left side - colored div instead of 3D model */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-64 h-64 rounded-xl bg-green-500 shadow-lg"></div>
        </div>
        
        {/* Right side - content */}
        <div className="w-1/2 flex flex-col items-start justify-center px-8">
          <h2 className="text-3xl font-bold mb-4">Experience Our Product</h2>
          <p className="text-base text-gray-700 mb-6">
            Discover the amazing features and benefits of our latest innovation. 
            Perfect for those who demand the very best.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Buy Now
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatComp;