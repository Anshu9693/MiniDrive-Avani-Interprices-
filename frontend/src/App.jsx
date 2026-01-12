import React from 'react'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserDashBoard from './pages/UserDashBoard'
import UserSignUp from './pages/UserSignUp'
// import AdminHome from './pages/AdminHome'
import UploadFile from './pages/UploadFile'
import AdminSignUp from './pages/AdminSignUp'
import AdminLogin from './pages/AdminLogin'
import AdminDashBord from './pages/AdminDashBord'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/user/login' element={<UserLogin/>} />
      <Route path='/user/signup' element={<UserSignUp/>} />
      <Route path='/user/dashboard' element={<UserDashBoard/>} />
      <Route path='/user/upload' element={<UploadFile/>} />
      // admin route to be added later

      <Route path='/admin/signup' element={<AdminSignUp/>} />
      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path='/admin/dashboard' element={<AdminDashBord/>} />



    </Routes>
    </>
  )}

export default App
