import React from 'react'
import { Link } from 'react-router-dom'
import notfound from '../assets/404event.gif'

const PageNotFound = () => {
    return (
        <div className='w-screen h-screen bg-white flex flex-col justify-center items-center'>
            <img src={notfound} alt="404 page not found" width={1000} />
            <Link to={"/"}>
                <button className='text-xl md:text-2xl lg:text-4xl font-bold font-Viaoda border-2 border-black rounded-3xl p-4 hover:bg-black hover:text-white'>Go to home</button>
            </Link>
        </div>
    )
}

export default PageNotFound
