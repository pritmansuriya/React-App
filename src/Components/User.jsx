import React, { useEffect, useState } from 'react'

const User = () => {
    const[users,setUsers] = useState([]);
    useEffect(() => {
        fetch("https://api.slingacademy.com/v1/sample-data/users")
        .then((response) => response.json())
        .then((data) => setUsers(data.users))
        .catch((error) => console.log(error));
    }, [])
  return (
    <div className='bg-lime-300 grid grid-cols-3 gap-5 p-5'>
      {users.map((user) => (
        <div key={user.id} className='border rounded-lg p-4'>
            <h2 className='font-bold text-xl'>{user.first_name} {user.last_name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
        </div>
      ))}
    </div>
  )
}

export default User
