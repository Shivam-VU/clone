import React from 'react'

import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

import ViewQuestionBank from '../../components/admin/ViewQuestionBank'

const ViewQuestionBankPage = () => {
  return (
    <>
        <Navbar />
        <ViewQuestionBank />
        <Footer/>
    </>
  )
}

export default ViewQuestionBankPage