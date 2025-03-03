import React from 'react'
import StudentRegistration from "../components/Form"
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const RegistrationForm = () => {
  return (
    <>
        <Navbar />
        <StudentRegistration />
        <Footer/>
    </>
  )
}

export default RegistrationForm