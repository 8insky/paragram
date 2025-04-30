
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import BuyComp from './components/BuyComp/BuyComp'
import FloatComp from './components/FloatComp/FloatComp'
import Break from './components/Break/Break'
import Object from './components/Object/Object'
import Faq from './components/faq/Faq'
import Opinions from './components/Opinions/Opinions'
import { useState } from 'react'

function App() {

  const [menuVisibility, setMenuVisibility] = useState(false)


  return (
    <div >
    <Header menuVisibility = {menuVisibility} setMenuVisibility = {setMenuVisibility}/>
    <Hero/>
   
    <About/>

    
    <BuyComp/>
    <Opinions/>
    <Faq/>
    <Break />
    <div className='relative'>
    
  </div>
    </div>
  )
}

export default App
