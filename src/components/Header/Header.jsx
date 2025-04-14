import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Header = ({ menuVisibility, setMenuVisibility }) => {
  const menuRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (menuVisibility) {
      tl.set(menuRef.current, { display: 'block' })
        .fromTo(menuRef.current, {
          y: -100,
          opacity: 0,
          clipPath: 'inset(0 0 100% 0)',
        }, {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.8,
        })
        .fromTo(itemsRef.current, {
          y: 30,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
        }, '-=0.4');
    } else {
      tl.to(itemsRef.current, {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
      })
        .to(menuRef.current, {
          y: -50,
          opacity: 0,
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.6,
        })
        .set(menuRef.current, { display: 'none' });
    }

    return () => tl.kill();
  }, [menuVisibility]);

  const menuItems = [
    { label: "Strona główna", link: "/" },
    { label: "O nas", link: "/o-nas" },
    { label: "Usługi", link: "/uslugi" },
    { label: "Kontakt", link: "/kontakt" }
  ];

  return (
    <div className='relative h-[10%] z-100 top-0 left-0 right-0'>
      <h1 className="absolute top-5 left-5 text-xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text drop-shadow-[0_2px_15px_rgba(255,115,0,0.7)] tracking-wide animate-pulse select-none">
        Paragram
      </h1>

      {!menuVisibility && (
        <button
          onClick={() => setMenuVisibility(true)}
          className="fixed w-[90px] h-[90px] top-[-40px] rounded-full right-[-30px] z-50 cursor-pointer p-2 text-white bg-teal-600"
        >
          <span className='absolute left-[15px] text-2xl bottom-[15px]'>
            🍔
          </span>
        </button>
      )}
      <div
        ref={menuRef}
        className="bg-[#1C0221] h-[100vh] w-full shadow-2xl fixed top-0 left-0 z-40 hidden"
      >
        <button
          onClick={() => setMenuVisibility(false)}
          className="absolute top-6 right-6 text-white text-4xl z-50"
        >
          ❌
        </button>

        <ul className="w-full h-full flex flex-col justify-center items-center space-y-10 text-center">
          {menuItems.map((el, index) => (
            <li
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <a
                href={el.link}
                className="block w-full text-5xl px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-200"
              >
                {el.label}
              </a>
            </li>
          ))}

          <li>
            <button className="fixed top-[5px] text-3xl left-6 z-50 cursor-pointer p-2 text-white bg-transparent rounded">
              🛠️
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
