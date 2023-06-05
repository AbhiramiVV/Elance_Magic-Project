import React from 'react';
import { features } from '../data';
import { Link } from 'react-router-dom';
const FeaturesSecond = () => {
  const { title, subtitle, image } = features.feature2;
  return (
    <div>

     
      <section className='section'>
        <div className='container mx-auto'>
          <div className='flex flex-col lg:flex-row lg:gap-x-[100px]'>
            {/* text */}
            <div className='flex-1 flex flex-col justify-end'>
              <h2 className='title font-third'>{title}</h2>
              <p className='subtitle font-third'>{subtitle}</p>
            </div>
            {/* image */}
            <div className='flex-1'><Link to='/photo'>
              <img src={image.type} className='w-500 h-160' alt='' /></Link>
            </div>
          </div>
        </div>
      </section>
  
  
    </div>)
   
};

export default FeaturesSecond;
