import React,{ useRef, useState } from 'react'
import { BsImages } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const AddDP = ({photo,change,dp,setDp}) => {

    // const [image, SetImage] = useState("");
    const imageInput = useRef(null);
    const resetShare = () => {
      change(null);
      setDp(false);
    };

  return (
    <>
    <div className="w-[150px] h-[150px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] flex mx-auto mt-5  border-black border-2 rounded-full items-center justify-center">
    {photo ?( dp ? (
      <div
        className="previewImage w-[95%] h-[95%] rounded-full bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url(${(photo)})`,
        }}
      >
        <FaTimes onClick={resetShare} />
      </div>
    ) :(
      <div
        className="previewImage w-[95%] h-[95%] rounded-full bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url(${URL.createObjectURL(photo)})`,
        }}
      >
        <FaTimes className='' onClick={resetShare} />
      </div>
    )): (
      <div
        className="w-[95%] h-[95%] flex flex-col bg-[#f6f6f6] cursor-pointer rounded-full items-center justify-center"
        onClick={() => imageInput.current.click()}
      >
        <BsImages className="text-[30px]" />
        <h1 className='text-sm md:text-base'>Add Profile Picture</h1>
      </div>
    )}
  </div>
  <input
    onChange={(e) => {
      change(e.target.files[0]);
      // console.log(image);
    }}
    type="file"
    id="file"
    ref={imageInput}
    style={{ display: "none" }}
    accept="image/x-png,image/gif,image/jpeg"
    
            />
            </>
  )
}

export default AddDP
