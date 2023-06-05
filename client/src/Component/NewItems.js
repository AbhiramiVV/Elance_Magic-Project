import React from 'react';
import NewItemsSlider from '../Component/NewItemsSlider'
import logo from '../assets/logo.jpg'

import { newInStore } from '../data';
const NewItems = () => {
  const{title,subtitle,link,icons}=newInStore;

  return (<div>
    <section className='section'>
<div className='container mx-auto'>
  <div className='flex flex-col lg:flex-row'>
    <div className='flex md:flex-col  gap-x-6 mb-6 lg:mb-17 lg:-right-12'>
    <img src={logo} className='w-40 h-40 mx-auto '/>
    {/* <h2 className='title max-w-[245px] lg:mt-[20px] lg:mb-[50px] text-2xl'>{title}</h2>
       <h1 className='max-w-[245px] lg:mb-12 font-bold text-4xl'>{subtitle}</h1>  */}
        <div className='flex-1 flex flex-col justify-end'>
              <h2 className='title font-third'>{title}</h2>
              <p className='subtitle text-3xl font-third'>{subtitle}</p>
            </div>
  
      <div className='hidden lg:flex items-center'>
    
      </div>
    </div>
    <div className='lg:max-w-[800px] xl:max-w-[990px] mr-5 lg:absolute lg:-right-5'>
     
    <NewItemsSlider/>
    </div>
  </div>

</div>
    </section>
  </div>
)};

export default NewItems;
