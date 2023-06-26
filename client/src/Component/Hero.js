import React from 'react';
import { hero } from '../data';
import Stats from '../Component/Stats';
import logo from '../assets/logo.jpg';

const Hero = () => {
  const {title,subtitle,buttonText}=hero;
  return(
   <section className='h-[671px] w-full bg-hero bg-right text-black bg-cover bg-no-repeat  pt-[225px] pb-[254px] relative mb-12 lg:bg-center lg:mb-28'>
    <div className='container mx-auto text-center'>
      <h1 className='text-2xl mx-auto font-semibold mb-[30px] lg:text-[64px] lg:leading-tight lg:max-w-[70px]'></h1></div>
<h2 className='mb-[30px] max-w-[627px] mx-auto lg:mb-[65px] lg:text-ul'></h2>
<div className='mx-auto'>
<button className=' px-[35px] py-[9px] text-xl rounded-md  transition lg:px-[80px] lg:py-[16px] lg:mb-[194px] mx-auto'></button>
</div>

 
<div>
  <Stats/>
  </div> 
  <div>

  

</div>
  
  
   </section>
  )
};

export default Hero;
