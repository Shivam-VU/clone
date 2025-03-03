import React from 'react'

import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

import AdminHome from '../../components/admin/AdminHome'

const AdminHomePage = () => {
  return (
    <>
        <Navbar />
        <AdminHome />
        <Footer/>
    </>
  )
}

export default AdminHomePage