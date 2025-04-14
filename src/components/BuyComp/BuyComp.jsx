import React from 'react'
import { useRef } from 'react'

const BuyComp = () => {

  const buyRef = useRef(null)
  return (
    <section ref={buyRef} className="w-full min-h-[30vh] h-{20vh} bg-white flex flex-col items-center gap-[20px] px-6 text-left">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#611c35] drop-shadow-md mb-6">
        KUP TERAZ – ZACZNIJ TWORZYĆ!
      </h2>
      <p className="text-lg md:text-xl text-[#3f3d56] max-w-[600px] drop-shadow-sm mb-10">
        Zaskocz znajomych, rozbudź wyobraźnię i przetestuj swój umysł! <br />
        Gra Słów to idealny prezent i genialna zabawa dla każdego.
      </p>

      {/* <button  className="bg-[#1A7B88] cursor-pointer text-white text-xl px-10 py-4 rounded-full shadow-xl hover:bg-[#155f68] transition duration-300 ease-in-out">
        🛒 Zamów teraz
      </button> */}
    </section>
  )
}

export default BuyComp
