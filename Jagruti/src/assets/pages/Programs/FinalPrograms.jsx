import React from 'react'
import ProgramsHero from './ProgramsHero.jsx'
import Programs from './Programs.jsx'
import Impact from './Impact.jsx'
import Footer from './Footer.jsx'
import "../../../FinalPrograms.css"

const FinalPrograms = () => {
  return (
    <>
                <div className="site-shell">
            <main>
              <ProgramsHero />
              <Programs />
              <Impact />
            </main>
            <Footer />
          </div> 
    </>
  )
}

export default FinalPrograms
