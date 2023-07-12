import React from 'react';

import { footer } from '../data';
import { TiSocialFacebookCircular, TiSocialLinkedinCircular, TiSocialTwitterCircular } from 'react-icons/ti'
import {GrSend} from 'react-icons/gr';

const Footer = () => {
  return (
    <div className='grid grid-col md:grid-cols-3 w-full h-auto bg-[#303030] pt-5 sm:p-12  bottom-0'>
    <div className='flex flex-col items-center'>
        <h2 className='uppercase font-bold text-3xl text-white '>connect with us</h2>
        <div className='flex flex-row mt-5'>
        <input type="text" name="complaint" value="" className='sm:w-[250px] md:w-[280px] h-[70px] rounded-3xl bg-[#D9D9D9]'/>
         <button className='w-[70px] h-[70px] bg-[#D9D9D9] rounded-full ml-3 flex items-center p-4'><GrSend className='text-4xl'/></button>   
        </div>
        <div className='flex flex-row mt-5'>
            <TiSocialFacebookCircular className='text-white text-6xl'/>
            <TiSocialLinkedinCircular className='text-white text-6xl'/>
            <TiSocialTwitterCircular className='text-white text-6xl'/>
            
        </div>
        <p className='text-gray-400 mt-6'>© Copyright 2023 . All rights reserved</p>
    </div>
    <div className='flex flex-col items-center mt-6 md:mt-0'>
        <h3 className='uppercase font-semibold text-white text-xl'>useful links</h3>
        <a href="#" className='text-white mt-4 text-base font-thin'>Help and Support</a>
        <a href="#" className='text-white mt-4 text-base font-thin'>Terms of Use</a>
        <a href="#" className='text-white mt-4 text-base font-thin'>Disclaimer</a>
        <a href="#" className='text-white mt-4 text-base font-thin'>Privacy Policy</a>
        <a href="#" className='text-white mt-4 text-base font-thin'>FAQs</a>
        
    </div>
    <div className='flex flex-col items-center mt-6 md:mt-0'>
        <h3 className='uppercase font-semibold text-white text-xl'>Services</h3>
        <a href="#" className='text-white mt-4 text-base font-thin'>Wedding planners</a>
        <a href="#" className='text-white mt-4 text-base font-thin'>Live music & orchestra</a>
        <a href="#" className='text-white mt-4 text-base font-thin'>Bridal makeup</a>
        <a href="#" className='text-white mt-4 text-base font-thin'>Travels</a>
        <a href="#" className='text-white mt-4 text-base font-thin'>Catering</a>

        
    </div>
    

</div>
  )
};

export default Footer;
