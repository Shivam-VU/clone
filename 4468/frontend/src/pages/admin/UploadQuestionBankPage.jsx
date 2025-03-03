import React from 'react'

import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

import UploadQuestionBank from '../../components/admin/UploadQuestionBank'

const UploadQuestionBankPage = () => {
  return (
    <>
        <Navbar />
        <UploadQuestionBank />
        <Footer/>
    </>
  )
}

export default UploadQuestionBankPage