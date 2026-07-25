import React from 'react'
import CustomNavbar from "../Navbars.jsx";
import Hero from "./Hero.jsx"
import Paragraph from './Paragraph.jsx';
import Card1 from './Card1.jsx';
import Card2 from './Card2.jsx';
import Donation from './Donation.jsx'
import Cards3 from './Cards3.jsx'
import Footer from './Footer.jsx'

const FinalDonation = () => {
  return (
    <>
      <CustomNavbar/>
      <Hero/>
      <Paragraph/>
      <Card1/>
      <Card2/>
      <Donation />
      <Cards3 />
      <Footer />
    </>
  )
}

export default FinalDonation