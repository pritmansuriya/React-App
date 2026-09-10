import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Info = () => {
    const navigate = useNavigate();
     const user2 = JSON.parse(localStorage.getItem("loggedInUser"));
     const data = JSON.parse(localStorage.getItem("contactData"));
    useEffect(() => {
        if(!user2)
        {
            navigate("/");
        }
    },[navigate])
    
  return (
    <section id='info1' className='px-20 py-20 min-h-screen bg-fuchsia-500 w-full '>
        {user2 && (
        <div className='mb-5 text-center'>
            <h2 className='text-white text-xl'>
                Welcome, {user2.name}
            </h2>

            <p className='text-white'>
                Email: {user2.email}
            </p>
        </div>
        )}

        {data && (
        <div className='mb-5 '>
            <h2 className='text-white text-center text-3xl mt-6'>
                Contact Informtion
            </h2>

            
            <p className='text-white '>
                Name: {data.name}
            </p>

            <p className='text-white'>
                Email: {data.email}
            </p>
            <p className='text-white'>
                Phone: {data.phone}
            </p>
            <p className='text-white'>
                Company: {data.company}
            </p>
            <p className='text-white'>
                Message: {data.message}
            </p>
        </div>
        )}
    </section>
  )
}

export default Info
