import React from 'react'
import FooterGlow from './FooterGlow'
import { Navbar } from './navbar'

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-background'>
      <Navbar />
      {children}
      <FooterGlow />
    </div>
  )
}

export default LandingPageLayout
