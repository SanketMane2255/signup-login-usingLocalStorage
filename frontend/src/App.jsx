
import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Components/Signup'
import Login from './Components/Login'
import Student from './Components/Student';
import Admin from './Components/Admin';


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/student' element={<Student/>}/>
        <Route path='/admin' element={<Admin/>}/>
        
      </Routes>
    </>
  )
}

export default App
