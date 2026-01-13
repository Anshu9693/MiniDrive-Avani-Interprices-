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
import UserSharedFiles from './pages/UserSharedFiles '
import ViewFile from './pages/user/file/ViewFile '
import EditFile from './pages/user/file/EditFile'



const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/user/login' element={<UserLogin/>} />
      <Route path='/user/signup' element={<UserSignUp/>} />
      <Route path='/user/dashboard' element={<UserDashBoard/>} />
      <Route path='/user/upload' element={<UploadFile/>} />
      <Route path='/user/shared-with-me' element={<UserSharedFiles/>} />
      <Route path="/user/file/view/:id" element={<ViewFile />} />
      <Route path="/user/file/edit/:id" element={<EditFile />} />



      // admin route to be added later

      <Route path='/admin/signup' element={<AdminSignUp/>} />
      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path='/admin/dashboard' element={<AdminDashBord/>} />



    </Routes>
    </>
  )}

export default App
