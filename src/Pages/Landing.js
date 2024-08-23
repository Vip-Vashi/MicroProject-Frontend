import React from 'react'
import Header from '../Components/Appbar'
import Footer from '../Components/HomeFooter'
import UserPage from './UserAuction'
import Banner from '../Components/Banner'
import Jumbo from '../Components/Jumbo'
function Landing() {
  return (
    <>
      <Header/>
      <Banner/>
      <Jumbo/>
      
      <Footer/>
    </>
  )  
}


export default Landing
