import React from 'react';
import TestimonialSlider from './TestimonialSlider';
import { testimonial } from '../data';
const Testimonial = () => {
  const { image, title } = testimonial;
  return (
    <div>
       <section className='section'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row lg:gap-x-10 gap-y-2'>
          <div className='lg:max-w-[50%]'>
            {/* title */}
            <h2 className='title mb-9'>{title}</h2>
            {/* slider */}
            <TestimonialSlider />
          </div>
          {/* image */}
          <div className='order-1'>
            <img src={image.type} alt='' />
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Testimonial;
