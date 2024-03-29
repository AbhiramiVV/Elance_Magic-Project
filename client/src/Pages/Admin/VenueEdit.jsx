import React, { useEffect, useState } from 'react'

import axios from '../../instance/axios'
import {useNavigate,useParams } from 'react-router-dom';
import Adminsidebar from '../../Component/Adminsidebar';
import { useAuthContext } from '../../Hooks/useAuthContext';
function VenueEdit() {
  const {id}=useParams();
    //const history = useHistory();
    const Navigate=useNavigate()
    const{admin}=useAuthContext()
    console.log(id)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [type, setType] = useState("");
    const [description, setDesc] = useState("");
    const [address, setAddress] = useState("");
    const [seats, setseats] = useState("");
    const [location, setLocation] = useState("");
    const [manager, setmanager] = useState("");
    const [mobile, setmobile] = useState("");
    const [rent, setRent] = useState("");
    const [files, setFiles] = useState([]);


    useEffect(()=>{
        const fetchadmin=async()=>{
            const response = await axios.get(`/vendor/singleVenue/${id}`,{
              headers: {
                Authorization: `${admin.token}`
            },
            });
            const Venue=response.data;
            setname(Venue.name);
            setemail(Venue.email);
            setseats(Venue.seats);
            setDesc(Venue.description);
            setLocation(Venue.location)
            setAddress(Venue.address)
            setmanager(Venue.manager);
            setmobile(Venue.mobile)
            setType(Venue.type)
            setRent(Venue.rent)
            setFiles(Venue.files)
        }
        fetchadmin();
        

    },[id]);

const updateVenue=async(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("name", name);
    formData.append("manager", manager);
    formData.append("address", address);
    formData.append("location", location);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("rent", rent);
    formData.append("seats", seats);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    await axios.put(`/vendor/venuEdit/${id}`,formData,{
      headers: {
        Authorization: `${admin.token}` ,  'content-type': 'multipart/form-data'


    },
  })
    Navigate("/vendor/venueDisplay")
    
}

  return (
    <div>
        <div className='flex gap-24'>
      <Adminsidebar/>
        
      <div className="py-2">
          <section className=" py-1 bg-blueGray-50 ">
            <div className="w-full lg:w-full px-4 mx-auto mt-6">
              <form onSubmit={updateVenue} encType="multipart/form-data">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-l-emerald-900">
                  <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-center">
                      <h6 className="text-blueGray-700 text-xl font-bold">
                        VENUE MANAGEMENT
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
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2 mt-2"
                            htmlfor="grid-password"
                          >
                            Type of venues
                          </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-8 leading-tight focus:outline-none focus:shadow-outline"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value={''}>--Please select--</option>
                               
                                    <option value='Hotels'>
                                        Hotels
                                    </option>
                                    <option value='Marriage Gardens'>
                                    Marriage Gardens
                                    </option>
                                              <option value='Wedding Lawns'>
                                      Wedding Lawns
                                    </option>
                                    <option value='Palace & Forts'>
                                    Palace & Forts
                                    </option>
                                    
                                    <option value='Places of Worship'>
                                    Places of Worship       
                                    </option>
                                       <option value='Beaches & Islands'>
                                       Beaches & Islands
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
                            Address
                          </label>
                          <input
                            type="text"
                            value={address}
                            name="manager"
                            onChange={(e) => setAddress(e.target.value)}
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
                            Location
                          </label>
                          <input
                            type="text"
                            value={location}
                            name="manager"
                            onChange={(e) => setLocation(e.target.value)}
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
                            value={description}
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
                            No Seats
                          </label>
                          <input
                            type="text"
                            name="seats"
                            value={seats}
                            onChange={(e) => setseats(e.target.value)}
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
  onChange={(e) => setFiles((e.target.files))}
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

export default VenueEdit