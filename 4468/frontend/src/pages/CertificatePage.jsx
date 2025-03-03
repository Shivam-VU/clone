import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

import CertificatesUploadComponent from '../components/Certificates'

const CertificatePage = () => {
  return (
    
    <>

      <Navbar />
      <CertificatesUploadComponent />
      <Footer/>
    </>
  )
}

export default CertificatePage