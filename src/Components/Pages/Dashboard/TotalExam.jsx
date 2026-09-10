import React from 'react'
import { HiArrowTrendingDown } from 'react-icons/hi2'

const TotalExam = () => {
  return (
    <div className='bg-white rounded-2xl shadow-sm p-6 h-55 overflow-x-auto'>
      {/* Header */}
      <div className='flex items-start justify-between mb-3'>
        <h2 className='text-2xl font-bold text-gray-800'>Total Exam
        </h2>
        <div className='flex items-center gap-1 bg-red-50 text-red-400 px-3 py-1 rounded-full text-xs font-semibold'>
            <HiArrowTrendingDown className='text-sm'></HiArrowTrendingDown>
            <span>80%</span>
        </div>
      </div>

      {/* Number */}
      <div className='flex flex-col  items-start gap-4 mt-6'>
      <h1 className='text-4xl font-bold text-[#111827]'>
        256
      </h1>
      {/* Description */}
      <p className='text-gray-400 text-left text-base leading-7 '>
        Here is your total exam ratio in this
        <br />
        month.Click here to
        <span className='text-purple-600 font-semibold cursor-pointer'> view details</span>
      </p>
      </div>
    </div>
  )
}

export default TotalExam
