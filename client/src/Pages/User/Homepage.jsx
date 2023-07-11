import React from 'react'
import { Link } from 'react-router-dom';
import Hero from '../../Component/Hero'
import Features from '../../Component/Features';
import Newitems from '../../Component/NewItems';
import FeaturesSecond from '../../Component/FeaturesSecond';
import NewItems from '../../Component/NewItems';
import logo from '../../assets/logo.jpg';
import Testimonial from '../../Component/Testimonial';
import Footer from '../../Component/Footer';
import photo from '../../Pages/User/Photographer'
import ring from '../../assets/ring.jpg'
import Header from '../../Component/Header';

function Homepage() {
  return (
    <div className='w-full max-w-[1440px] mx-auto bg-white'>
 <Header/>
<Hero/>

<div class="relative grid h-[40rem] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
  <div class="absolute inset-0 m-0 h-full overflow-hidden rounded-none bg-transparent bg-[url('https://img.freepik.com/free-photo/decorative-floral-composition-table_8353-9811.jpg')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none w-full">
    <div class="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"></div>
  </div>
  <div class="relative p-6 py-14 px-6 md:px-12 w-full">
    <h2 class="mb-6 block font-sans text-6xl font-medium leading-[1.5] tracking-normal font-secondary text-white antialiased">
    A goal without a plan is just a wish.
    </h2>
    <Link to='/bookpage'><button type="button" class="text-white bg-gradient-to-r from-cyan-500  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg  px-8 py-3 text-center mb-2 mx-auto block text-3xl">View  our events now </button></Link>
  </div>
</div>


<Features/>

  <Newitems/>
  <FeaturesSecond />
      <Testimonial />
      <Footer />
     </div>
    
  )
}

export default Homepage