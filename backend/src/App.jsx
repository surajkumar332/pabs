import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import AllDoctors from './Pages/AllDoctors/AllDoctors'
import About from './Pages/About/About'
import BookedAppointment from './Pages/BookedAppointment/BookedAppointment'
import DoctorDetails from './Pages/DoctorDetails/DoctorDetails'
import Booked from './Components/Booked/Booked'
import Doctors from './Pages/Doctors/Doctors'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import AdminRoute from './Pages/Admin/AdminRoute'
import Admin from './Pages/Admin/Admin'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/alldoctors' element={<AllDoctors />} />
        <Route path='/about' element={<About />} />
        <Route path='/bookedAppointment' element={<BookedAppointment />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/doctors/:specialization" element={<Doctors />} />
        <Route path="/booked" element={<Booked />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </>

  )
}

export default App;