import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Subjects from '../components/subjects/Subjects'
import Footer from '../components/Footer'


const Home = ({isLoggedIn, handleLogin, setIsLoggedIn}) => {
  return (
    <div>
      <Header onLogin={handleLogin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />
      <Hero/>
      <Footer/>
    </div>
  )
}

export default Home