import React, { useEffect, useState } from 'react'
import axios from '../../instance/axios'
import {useNavigate,useParams } from 'react-router-dom';
import Adminsidebar from '../../Component/Adminsidebar';
import { useAuthContext } from '../../Hooks/useAuthContext';
function MakeupEdit() {
    const {id}=useParams();
    const{admin}=useAuthContext()
      //const history = useHistory();
      const Navigate=useNavigate()
      
      console.log(id)
      const [name, setname] = useState("");
      const [email, setemail] = useState("");
      const [type, setType] = useState("");
      const [desc, setDesc] = useState("");
      const [manager, setmanager] = useState("");
      const [mobile, setmobile] = useState("");
      const [rent, setRent] = useState("");
      const [image, setImage] = useState([]);
      useEffect(()=>{
          const fetchadmin=async()=>{
              const response = await axios.get(`/vendor/singleMakeup/${id}`,{
                headers: {
                  Authorization: `${admin.token}`
              },
              });
              const Make=response.data;
              setname(Make.name);
              setemail(Make.email);
              setDesc(Make.desc);
              setmanager(Make.manager);
              setmobile(Make.mobile)
              setType(Make.type)
              setRent(Make.rent)
              setImage(Make.image)
          }
          fetchadmin();
          
  
      },[id]);
  
  const updateMake=async(e)=>{
      e.preventDefault()
      const updateMake={name,email,mobile,type,rent,image};
      await axios.put(`/vendor/makeedit/${id}`,updateMake)
      Navigate("/vendor/Makedisplay")
      
  }
  
    return (
      <div>
          <div className='flex gap-24'>
        <Adminsidebar/>
          
        <div className="py-2">
            <section className=" py-1 bg-blueGray-50 ">
              <div className="w-full lg:w-full px-4 mx-auto mt-6">
                <form onSubmit={updateMake} encType="multipart/form-data">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-l-emerald-900">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                      <div className="text-center flex justify-center">
                        <h6 className="text-blueGray-700 text-xl font-bold">
                          BRIDE MAKEUP MANAGEMENT
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
                                          Traditional Makeup
                                      </option>
                                      <option value='Modern Decor'>
                                          Modern Makeup
                                      </option>
                                      <option value='Royal Decor'>
                                        Royal Makeup
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
                              value={manager}
                              name="manager"
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
                              type="file"
                              id="image"
                              
                              name="image"
                              accept="image/*"
                              multiple={true}
          
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                            
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

export default MakeupEdit
