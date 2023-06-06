import React, { useRef, useState } from 'react'
import { BsImages } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const AddCoverPhoto = ({ photo, change, cover, setCover }) => {

  // const [image, SetImage] = useState("");
  const imageInput = useRef(null);
  const resetShare = () => {
    change(null);
    setCover(false);
  };

  return (
    <>
      <div className="w-[400px] h-[250px] md:w-[750px] md:h-[450px] lg:w-[1000px] lg:h-[500px] flex mx-auto  border-black border-2 rounded-2xl items-center justify-center">
        {photo ? (cover ? (
          <div
            className="previewImage w-[95%] h-[95%] bg-contain bg-center bg-no-repeat "

            style={{ backgroundImage: `url(${(photo)})`, }}

          >
            <FaTimes onClick={resetShare} />
          </div>
        ) : (
          <div
            className="previewImage w-[95%] h-[95%] bg-contain bg-center bg-no-repeat "

            style={{ backgroundImage: `url(${URL.createObjectURL(photo)})`, }}

          >
            <FaTimes onClick={resetShare} />
          </div>
        )) : (
          <div
            className="w-[95%] h-[95%] flex flex-col bg-[#f6f6f6] cursor-pointer rounded-2xl items-center justify-center"
            onClick={() => imageInput.current.click()}
          >
            <BsImages className="text-[30px]" />
            <h1>Add Cover Photo</h1>
          </div>
        )}
      </div>
      <input
        onChange={(e) => {
          change(e.target.files[0]);
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

export default AddCoverPhoto
