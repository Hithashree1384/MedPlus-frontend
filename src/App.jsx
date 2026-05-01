import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import DoctorDetail from './pages/DoctorDetails'
import Service from './pages/Service'
import ServiceDetails from './pages/ServiceDetails'
import Contact from './pages/Contact'
import Login from './pages/Login'
import DocHome from './pages/DocHome'
import List from './doctors/List'
import Edit from './doctors/Edit'
import Appointment from './pages/Appointment'

import AIWidget from './components/AIWidget'
import VerifyServicePayment from './VerifyServicePayment'
import VerifyPayment from './VerifyPayment'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/doctors" element={<Doctor/>}/>
        <Route path="/doctors/:id" element={<DoctorDetail/>}/>
        <Route path='/services' element={<Service/>}/>
        <Route path='/services/:id' element={<ServiceDetails/>}/>
        <Route path='/appointments' element={<Appointment/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='doctor-admin/login' element={<Login/>}/>
        <Route path='/doctor-admin/:id' element={<DocHome/>}/>
        <Route path='/doctor-admin/:id/appointments' element={<List/>}/>
        <Route path='/doctor-admin/:id/profile/edit' element={<Edit/>}/>
        <Route path='/appointment/success' element={<VerifyPayment/>}/>
         <Route path='/appointment/cancel' element={<VerifyPayment/>}/>

          <Route path='/service-appointment/success' element={<VerifyServicePayment/>}/>
         <Route path='/service-appointment/cancel' element={<VerifyServicePayment/>}/>
        
        
        
      </Routes>
       <AIWidget/>

    </div>
  )
}

export default App
