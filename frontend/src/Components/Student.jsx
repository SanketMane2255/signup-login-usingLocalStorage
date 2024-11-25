import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Stylling.css'

const Student = () => {
    const [loggedInUser,setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('logedInUser'))
        console.log(setLoggedInUser)
    },[])
    console.log(loggedInUser)

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('logedInUser');
        setTimeout(()=>{
            navigate('/login')
        },1000)
    }


  return (
    <div className="student-container container mt-5">
    <h1 className="student-title">Welcome to the Student Dashboard</h1>
    <h3 className="student-username">
        Student Name: {loggedInUser || 'Guest'}
    </h3>
    <button onClick={handleLogout} className="btn btn-primary student-button">
        Logout
    </button>
</div>
  )
}

export default Student