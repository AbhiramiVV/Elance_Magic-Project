import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Adminsidebar from "../../Component/Adminsidebar";
import { NavLink } from "react-router-dom";
import axios from "../../instance/axios";



function DecorAdd() {

  const [data, setdData] = useState("");
  const Navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [manager, setmanager] = useState("");
  const [mobile, setmobile] = useState("");
  const [rent, setRent] = useState("");
  const [image, setImage] = useState([]);
  console.log(image);
  const [imgeError, setImageError] = React.useState(false);


  const handleImageChange = (e) => {
    const files = e.target.files;

    console.log(files.length);

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/;

    let allValid = true;
    const Images = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (allowedExtensions.exec(file.name)) {
        Images.push(file);
      } else {
        allValid = false;
        break;
      }
    }

    if (!allValid) {
      setImageError(true);
    } else {
      setImageError(false);
      setImage(Images);
    }
    console.log(imgeError);
  };

  const addDecoration = async (e) => {
    console.log(name);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("manager", manager);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("type", type);
    formData.append("desc", desc);
    formData.append("rent", rent);

    for (let i = 0; i < image.length; i++) {
      formData.append(`image`, image[i]);
    }

    console.log(name,manager,email,type,desc,rent,image);

    try {
      const response = await axios
        .post("/vendor/addDecor", {name,manager,email,mobile,desc,rent,image}, {
          headers: {
           
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.message) {
            Navigate("/vendor/Decordisplay");
          }
        });
    } catch (error) {}
  };

  return (
    <div>
      <div className="flex gap-24">
        <Adminsidebar />

        <div className="py-2">
          <section className=" py-1 bg-blueGray-50 ">
            <div className="w-full lg:w-full px-4 mx-auto mt-6">
              <form onSubmit={addDecoration} encType="multipart/form-data">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-l-emerald-900">
                  <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-center">
                      <h6 className="text-blueGray-700 text-xl font-bold">
                        DECORATION MANAGEMENT
                      </h6>
                    </div>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-4">
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Type of Decoration
                          </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-8 leading-tight focus:outline-none focus:shadow-outline"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value={''}>--Please select--</option>
                               
                                    <option value='Traditional Decor'>
                                        Traditional Decor
                                    </option>
                                    <option value='Modern Decor'>
                                        Modern Decor
                                    </option>
                                    <option value='Royal Decor'>
                                      Royal Decor
                                    </option>
                               
                            </select>
                            </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Manager
                          </label>
                          <input
                            type="text"
                            name="manager"
                            value={manager}
                            onChange={(e) => setmanager(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Mobile No
                          </label>
                          <input
                            type="text"
                            name="mobile"
                            value={mobile}
                            onChange={(e) => setmobile(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Description
                          </label>
                          <textarea
                          type="text"
                            name="desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlfor="grid-password"
                          >
                            Rate Per Day
                          </label>
                          <input
                            type="text"
                            name="rent"
                            value={rent}
                            onChange={(e) => setRent(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2 mt-5"
                            htmlFor="image-upload"
                          >
                            Upload Image
                          </label>
                          <input
                                  id="image"
                                  type="file"
                                  name="image"
                                  accept="image/*"
                                  multiple={true}
                                  onChange={handleImageChange}
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />

                          {imgeError && (
                            <p className="mx-3 text-red-500 font-Ariza">
                              Only jpg | jpeg | png are allowed
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                  </div>
                </div>
                <div className="button flex justify-center">
                  <button
                    className="bg-black text-white active:bg-pink-600 font-bold uppercase text-xl px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DecorAdd;
