import React from 'react';
import {features}from '../data' 
const Features = () => {
  const{title,subtitle,image,buttonText,items}=features;
  return (
 <section className='section'>
  <div className='container mx-auto'>
    <div className='flex flex-col lg:flex-row lg:gap-x-[100px]'>
      <div className='flex-1 order-1 lg:-order-1'>
        <img src={image.type} className='w-30 h-15 object-contain' alt=''/>
      </div>
      <div className='flex-1 flex flex-col justify-end'>
        <h2 className='title font-third'>{title}</h2>
        <p className='subtitle font-third'>{subtitle}</p>
        <div>
          {items.map((item,index)=>{
            const{title,subtitle,image,icon}=item;
            return(
              <div>
<div></div>
<div>
  <h4></h4>
</div>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  </div>
 </section>
  )
};

export default Features;
