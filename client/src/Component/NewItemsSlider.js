import React from 'react';
import { Link } from 'react-router-dom';

import {Swiper,SwiperSlide}from 'swiper/react';
import 'swiper/css'
import 'swiper/css/pagination';
import { newInStore } from '../data';
const NewItemsSlider = () => {
  return (
    <div>
      <Swiper grabCursor={true}breakpoints={{
        320:{
          slidesPerView:2,
          spaceBetween:18,
        },
        768:{
          slidesPerView:3,
          spaceBetween:20,
        },
      }}>
        {newInStore.products.map((product,index)=>{
return(
  <SwiperSlide key={index} className='max-w-[265px]'>
    <div className='realtive'>
      <img src={product.image.type} alt=''/>
     
      <div className='absolute text-white bottom-[20px] w-full text-center text-[18px] lg:text-2xl font-medium capitalize font-third'>{product.name}</div>
      </div></SwiperSlide>
)
        })}
      </Swiper>
     
    </div>
  )
};

export default NewItemsSlider;
