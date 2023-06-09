import React from 'react';
import { hero } from '../data';
import Stats from '../Component/Stats';
import logo from '../assets/logo.jpg';
import Header from '../Component/Header'

const Hero = () => {
  const {title,subtitle,buttonText}=hero;
  return(
    <>

 
    <div className='banner-img'>
    <div className='container mx-auto text-center'>
    <div >
<Header />

</div>
      <h1 className='text-2xl mx-auto font-semibold mb-[30px] lg:text-[64px] lg:leading-tight lg:max-w-[70px]'></h1></div>
<h2 className='mb-[30px] max-w-[627px] mx-auto lg:mb-[65px] lg:text-ul'></h2>


 
<div style={{paddingTop:"420px"}}>
  <Stats/>
  </div> 
  <div>

  

</div>
  
  
   </div>
  
   </>
  )
};

export default Hero;
