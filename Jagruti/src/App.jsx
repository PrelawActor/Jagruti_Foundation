import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import CustomNavbar from "./assets/pages/Navbars.jsx";
import './App.css'
import Hero from "./assets/pages/Donation/Hero.jsx"
import Paragraph from './assets/pages/Donation/Paragraph.jsx';
import Card1 from './assets/pages/Donation/Card1.jsx';
import Card2 from './assets/pages/Donation/Card2.jsx';
import Donation from './assets/pages/Donation/Donation.jsx'
import Cards3 from './assets/pages/Donation/Cards3.jsx'

function App() {
  return (
    <>
      <CustomNavbar/ >
      <Hero/>
      <Paragraph/>
      <Card1/>
      <Card2/>
      <Donation />
      <Cards3 />
    </>
  )
}

export default App
