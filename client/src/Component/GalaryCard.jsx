import React from 'react'

const GalaryCard = (props) => {
  return (
    <div className='mb-7 lg:w-[500px] lg:h-[400px] md:w-[370px] md:h-[270px] w-[330px] h-[250px] rounded-2xl shadow-lg shadow-black flex items-center justify-center bg-black'>
      <img className='max-h-[90%] hover:scale-110 hover:duration-300' src={props.image} alt="images" />
    </div>
  )
}

export default GalaryCard
