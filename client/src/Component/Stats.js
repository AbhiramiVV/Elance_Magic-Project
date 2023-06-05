import React from 'react';

import { stats} from '../data'
import logo from '../assets/logo.jpg'

const Stats = () => {
  return(
<div className='bg-gray-900 text-white rounded-[20px] w-3/4 mx-auto p-12'>
  <div className='flex flex-wrap gap-y-8'>
    {stats.map((item,index)=>{
      return(
        <div className='min-h-[20px] w-3/4 flex flex-col justify-center odd:border-r lg:flex-1 lg:odd:border-r lg:even:border-r lg:even:last:border-none' key={index}>
         
          <div className='mx-auto text-2xl font-semibold lg:text-4xl'>{item.value}</div>
          <div className='mx-auto lg:text-xl font-light max-w-[110px] text-base'>{item.text}</div>
        </div>
      )
    })}

  </div>

</div>
  ) 
};

export default Stats;
