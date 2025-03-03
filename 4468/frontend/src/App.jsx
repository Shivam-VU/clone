import { useEffect, useState } from 'react'
import {  Routes,Route } from 'react-router-dom'

// unauthenticated routes
import RegistrationForm from './pages/RegistrationFormPage'
import PasswordPage from './pages/PasswordPage'
import StudentLoginPage from './pages/Studentloginpage'
import AdminLoginPage from './pages/admin/AdminloginPage'

// authenticated routes
import Homepage from './pages/Homepage'
import InternationalFormPage from './pages/InternationalFormPage'
import AboutPage from './pages/AboutPage'
import CertificatePage from './pages/CertificatePage'

// admin routes

import AdminHomePage from './pages/admin/AdminhomePage'
import UploadQuestionBankPage from './pages/admin/UploadQuestionBankPage'
import ViewQuestionBankPage from './pages/admin/ViewQuestionBankPage'
import PreviewQuesionBankPage from './pages/admin/PreviewQuesionBankPage'

function App() {
  const [token,setToken] = useState();
  const [isAdmin,setIsAdmin] = useState(false);
  useEffect(() => {
    setToken(localStorage.getItem('token'))
    setIsAdmin(localStorage.getItem('isAdmin'))
  }, [])
  if(!token){
    return (
      <>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/setpassword" element={<PasswordPage />} />
          <Route path = "/login" element = {<StudentLoginPage />} />
          <Route path = "/adminlogin" element = {<AdminLoginPage />} />
        </Routes>
      </>
    )
  }

  if(isAdmin){
    return (
      <>
        <Routes>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="/uploadquestionbank" element={<UploadQuestionBankPage />} />
          <Route path="/viewquestionbank" element={<ViewQuestionBankPage />} />
          <Route path="/previewquestionbank/:id" element={<PreviewQuesionBankPage />} />
        </Routes>
      </>
    )
  }

  return (
    <>
    <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/internationalform" element={<InternationalFormPage />} />
          <Route path='/personal-information' element={<AboutPage />} />
          <Route path='/certificates' element={<CertificatePage />} />
        </Routes>
    </>
        
  )
}

export default App
