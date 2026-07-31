import { useState } from 'react'
import FinalDonation from './assets/pages/Donation/FinalDonation'
import { Routes, Route } from "react-router-dom";
import CustomNavbar from './assets/pages/Navbars';
import FinalPrograms from './assets/pages/Programs/FinalPrograms';

function App() {
  return (
    <>
      <CustomNavbar/>
<Routes>
        <Route path="/programs" element={<FinalPrograms />} />
        <Route path="/donate" element={<FinalDonation />} />
      </Routes>
      {/* <FinalPrograms/> */}
      {/* <FinalDonation/> */}
    </>
  )
}

export default App
