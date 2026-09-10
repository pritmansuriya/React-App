import React from 'react'

const NewCourse = () => {
  return (
    <div className = 'bg-sky-50 rounded-2xl p-6 h-55 shadow-sm'>
      <div className='flex items-center gap-4'>

        {/* Image */}
        <div className='w-24 h-40 rounded-xl overflow-hidden shrink-0'>
            <img
                src='src\assets\API.png'
                alt='API Course'
                className='w-full h-full object-cover'
            />
        </div>

        {/* Content */}
        <div className='flex-1 flex flex-col items-start'>
            <p className='text-lg font-medium text-left text-gray-600'>New Course</p>
            <h2 className='text-xl text-left font-bold text-gray-950 leading-tight mt-2'>
                Build your career
                <br />
                with API
            </h2>

            <button className = 'mt-5  bg-[#222222] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-black transition'>
                Enroll Now
            </button>
        </div>
      </div>
    </div>
  )
}

export default NewCourse
