import React from 'react'
import Subjects from '../components/subjects/Subjects'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Resource = () => {
  return (
    <div>
        <Header/>
        <Subjects/> {/*yaha pe resource  list aayega instead of subjects*/}
        <Footer/>
    </div>
  )
}

export default Resource