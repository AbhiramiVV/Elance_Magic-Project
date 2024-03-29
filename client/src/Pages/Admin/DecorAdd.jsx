import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Adminsidebar from "../../Component/Adminsidebar";
import axios from "../../instance/axios";
import { useAuthContext } from "../../Hooks/useAuthContext";

function DecorAdd() {
  const {admin}=useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [manager, setManager] = useState("");
  const [mobile, setMobile] = useState("");
  const [rent, setRent] = useState("");
  const [files, setFiles] = useState([]);
  const [imageError, setImageError] = useState(false);
const id=admin.adminExist[0]._id;
  const navigate = useNavigate();

  const addDecoration = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("VendorId",id)
    formData.append("name", name);
    formData.append("manager", manager);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("type", type);
    formData.append("desc", desc);
    formData.append("rent", rent);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axios.post("/vendor/addDecor", formData, {
        headers: {
          Authorization: `${admin.token}` ,  'content-type': 'multipart/form-data'
  
  
      }
      });

      if (response.data.message) {
        navigate("/vendor/Decordisplay");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...selectedFiles]);
  };

  return (
    <div>
      <div className="flex gap-24">
        <Adminsidebar />

        <div className="py-2">
          <section className="py-1 bg-blueGray-50">
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
                            htmlFor="grid-password"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Manager Name
                        </label>
                        <input
                          type="text"
                          name="manager"
                          value={manager}
                          onChange={(e) => setManager(e.target.value)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap mt-4">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        </div>
                      </div>
                      <div className="relative w-full px-4">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Mobile
                        </label>
                        <input
                          type="number"
                          name="mobile"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap mt-4">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Type
                          </label>
                          <select
                                className="shadow appearance-none border rounded w-full py-2 px-8 leading-tight focus:outline-none focus:shadow-outline"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value={''}>--Please select--</option>
                               
                                <option value='Floral Decorations'>
                                    Floral Decorations
                                    </option>
                                    <option value='Lighting Effects'>
                                    Lighting Effects
                                    </option>
                                    <option value='Themed Decor'>
                                    Themed Decor
                                    </option>
                                    <option value='Balloon Decorations'>
                                    Balloon Decorations
                                    </option>
                                    <option value='Fabric Draping'>
                                    Fabric Draping
                                    </option>
                                    <option value='Table Settings'>
                                    Table Settings
                                    </option>
                                    <option value='Signage and Backdrops'>
                                    Signage and Backdrops
                                    </option>
                                    <option value='Hanging Installations'>
                                    Hanging Installations
                                    </option>
                                    <option value='Personalized Touches'>
                                    Personalized Touches
                                    </option>

                               
                            </select>
                        </div>
                      </div>
                      <div className="relative w-full px-4">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Rent
                        </label>
                        <input
                          type="number"
                          name="rent"
                          value={rent}
                          onChange={(e) => setRent(e.target.value)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>

                    <div className="relative w-full mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Services
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        name="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      ></textarea>
                    </div>

                    <div className="relative w-full mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Upload Images
                      </label>
                      <input
                        type="file"
                        name="files"
                        multiple
                        onChange={handleImageChange}
                        accept="image/*"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      {imageError && (
                        <p className="text-red-500 text-xs mt-1">
                          Please select valid image files (jpg, jpeg, png)
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center mt-6">
                      <button
                        className="text-white bg-emerald-500 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-600 rounded text-lg"
                        type="submit"
                      >
                        Add Decoration
                      </button>
                    </div>
                  </div>
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
