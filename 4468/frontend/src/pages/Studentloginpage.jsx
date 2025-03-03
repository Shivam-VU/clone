import React from 'react'

import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

import StudentLogin from '../components/Studentlogin'

const StudentLoginPage = () => {
  return (
    <>
        <Navbar />
        <StudentLogin />
        <Footer/>
    </>
  )
}

export default StudentLoginPage