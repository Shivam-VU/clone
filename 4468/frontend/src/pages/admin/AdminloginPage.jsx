import React from 'react'

import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

import AdminLogin from '../../components/admin/Adminlogin'

const StudentLoginPage = () => {
  return (
    <>
        <Navbar />
        <AdminLogin />
        <Footer/>
    </>
  )
}

export default StudentLoginPage