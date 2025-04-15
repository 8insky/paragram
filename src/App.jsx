
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import BuyComp from './components/BuyComp/BuyComp'
import FloatComp from './components/FloatComp/FloatComp'
import Break from './components/Break/Break'
import Object from './components/Object/Object'
import { useState } from 'react'

function App() {

  const [menuVisibility, setMenuVisibility] = useState(false)


  return (
    <>
    <Header menuVisibility = {menuVisibility} setMenuVisibility = {setMenuVisibility}/>
    <Hero/>
    <Object/>
   
    <About/>
    <BuyComp/>
    <Break />
    <FloatComp  menuVisibility = {menuVisibility} setMenuVisibility = {setMenuVisibility}/>
  
    </>
  )
}

export default App
