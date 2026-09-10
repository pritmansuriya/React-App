// import { title } from 'framer-motion/client'
import React from 'react'
import { FaUserGraduate, FaChalkboardTeacher, FaAward, FaDollarSign } from 'react-icons/fa'
import StatCard from './StatCard'

const stats1 = [
    {
        id : 1,
        title : "Students",
        value : "15.00K",
        icon : <FaUserGraduate size={55} />,
        bgColor : "bg-purple-100",
        iconColor : "text-purple-600",
        // percentage : "4.5%",
        // increase : true,
    },
    {
        id : 2,
        title : "Teachers",
        value : "200",
        icon : <FaChalkboardTeacher size={55} />,
        bgColor : "bg-blue-100",
        iconColor : "text-blue-600",
        // percentage : "2.1%",
        // increase : true,
    },
    {
        id : 3,
        title : "Awards", 
        value : "5.6K",
        icon : <FaAward size={55} />,
        bgColor : "bg-yellow-100",
        iconColor : "text-yellow-600",
        // percentage : "1.2%",
        // increase : true,
    },
];

const Stats1 = () => {
  return (
    <div className='grid grid-cols-3 gap-6 mt-6'>
      {stats1.map((item) => (
        <StatCard 
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            bgColor={item.bgColor}
            iconColor={item.iconColor}
            // percentage={item.percentage}
            // increase = {item.increase}
        />
      ))}
    </div>
  )
}

export default Stats1
