import React from 'react'
import Navbar from './Navbar'

const Header = ({handleLogin,isLoggedIn, setIsLoggedIn}) => {
  return (
    <div>
        <Navbar onLogin={handleLogin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  )
}

export default Header