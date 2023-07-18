import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../../instance/axios";
import { useAuthContext } from "../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Details() {
  const { user } = useAuthContext();
  const { id } = useParams();

  const [photo, setPhoto] = useState(null);
  const [venue, setVenue] = useState(null);
  const [decor, setDecor] = useState(null);
  const [cater, setCater] = useState(null);
  const [make, setMake] = useState(null);
  const [activeTab, setActiveTab] = useState("view");
  
  const Order = async () => {
    await axios
    .get(`/Orderdisplay`, {
      headers: {
          Authorization: `${user.token}`,
        },
      })
      .then((response) => {
        if (response.data.decor) setDecor(response.data.decor);
        if (response.data.venue) setVenue(response.data.venue);
        if (response.data.photo) setPhoto(response.data.photo);
        if (response.data.cater) setCater(response.data.cater);
        if (response.data.make) setMake(response.data.make);
      }).catch(err=>{
        console.log(err);
      })
      
    };
    useEffect(() => {
      Order();
    }, []);
    console.log(make,'8888888888888');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlephotocancel=async(id,bookItem)=>{
    try {
      const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to cancel ${bookItem}. This action cannot be undone.This order no longer displayed`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ok',
        cancelButtonText: 'Cancel',
      });
  
      if (confirmResult.isConfirmed) {
        await axios.put(`/cancelItem/${id}`,
        {
          bookItem:bookItem
        },
         {
          headers: {
            Authorization: `${user.token}`,
          },
        });
        await Order();
        toast.success('Order Has been cancelled successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to cancel.');
    }
  };


  return (
    <>
      <Header />

      <div className="w-full ">
        <div
          class="flex h-screen w-full items-center justify-center"
          style={{ width: "100%" }}
        >
          <div class="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div class="grid-cols-1 lg:col-span-3"></div>

              <div class="col-span-1 lg:col-span-9">
                <div class="text-center lg:text-left">
                  <h2 class="text-2xl font-bold text-zinc-700"></h2>
                  <p class="mt-2 font-semibold text-xl text-zinc-700">
                    Order Details
                  </p>
                  <p class="mt-4 text-zinc-500">
                    You can check your order details here!!!
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full  overflow-x-hidden flex justify-center  py-0 items-center overflow mx-auto mt-8 gap-4">
            <div
    id="slider"
    className="h-full flex lg:gap-8 md:gap-6 gap-10 items-center justify-start transition ease-out mt-10 duration-700"
    style={{
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      marginRight: '-10px' ,
    }}
  >
              <p
                className={`text-black font-bold py-2 px-4 rounded-full ${
                  activeTab === "photographer"
                    ? "opacity-50 cursor-not-allowed gap-4"
                    : ""
                }`}
                onClick={() => handleTabClick("view")}
                disabled={activeTab === "view"}
              >
                view all bookings
              </p>

              <button
                className={`bg-black text-white font-bold py-2 px-4 rounded-full ${
                  activeTab === "photographer"
                    ? "opacity-50 cursor-not-allowed gap-4"
                    : ""
                }`}
                onClick={() => handleTabClick("photographer")}
                disabled={activeTab === "photographer"}
              >
                Photographer Bookings
              </button>
              <button
                className={`bg-black text-white font-bold py-2 px-4 rounded-full ${
                  activeTab === "venue" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleTabClick("venue")}
                disabled={activeTab === "venue"}
              >
                Venue Bookings
              </button>
              <button
                className={`bg-black text-white font-bold py-2 px-4 rounded-full ${
                  activeTab === "decor" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleTabClick("decor")}
                disabled={activeTab === "decor"}
              >
                Decor Bookings
              </button>
              <button
                className={`bg-black text-white font-bold py-2 px-4 rounded-full ${
                  activeTab === "cater" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleTabClick("cater")}
                disabled={activeTab === "cater"}
              >
                Catering Bookings
              </button>
              <button
                className={`bg-black text-white font-bold py-2 px-4 rounded-full ${
                  activeTab === "make" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleTabClick("make")}
                disabled={activeTab === "make"}
              >
                Makeup Bookings
              </button>
              </div>
            </div>
            {activeTab === "photographer" && (
              <table className="mt-5 mx-auto">
                <caption className="text-lg text-center font-bold m-5">
                  Photographer bookings
                </caption>
                <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
                  <thead>
                    <tr className="text-left border-b-2 border-gray-300">
                      <th className="px-4 py-3">Image Of Event</th>
                      <th className="px-4 py-3">Name of Company</th>
                      <th className="px-4 py-3">Payment Amount</th>
                      <th className="px-4 py-3">Booking Date</th>
                      <th className="px-4 py-3">Event Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {photo &&
                      photo.map((booking) => (
                        <tr
                          key={booking._id}
                          className="bg-gray-100 border-b border-gray-200"
                        >
                          <td className="px-4 py-3">
                            {" "}
                            <img
                              src={`https://server.skoshoes.store/uploads/${booking.PhotoId.image[0]?.files[0]?.filename}`}
                              alt="Photographer Image"
                              className="h-10 w-10 rounded-full"
                            />
                          </td>
                          <td className="px-4 py-3">{booking.PhotoId.pname}</td>
                          <td className="px-4 py-3">
                            {booking.PhotoId.rate}
                            <br />
                            (paid={booking.PhotoId.rate / 2})
                          </td>

                          <td className="px-4 py-3">
                            {new Date(booking.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {new Date(booking.Date).toLocaleDateString("en-GB")}
                          </td>
                          <td className="px-4 py-3">
                            {booking.PhotoId.eventDate}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              className="inline-block rounded bg-green-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                              onClick={()=>handlephotocancel(booking._id,'photographer')} >
                              Cancel
                            </button>
                          </td>

                       
                        </tr>
                      ))}
                  </tbody>
                </table>
              </table>
            )}
            {activeTab === "venue" && (
              <table className="mt-5 mx-auto">
                <caption className="text-lg text-center font-bold m-5">
                  Venue bookings
                </caption>
                <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
                  <thead>
                    <tr className="text-left border-b-2 border-gray-300">
                    <th className="px-4 py-3">Image Of Event</th>
                      <th className="px-4 py-3">Name of Company</th>
                      <th className="px-4 py-3">Payment Amount</th>
                      <th className="px-4 py-3">Booking Date</th>
                      <th className="px-4 py-3">Event Date</th>
                    </tr>
                  </thead>
                  {venue &&
                    venue.map((booking) => (
                      <tr
                        key={booking.id}
                        className="bg-gray-100 border-b border-gray-200"
                      >
                        <td className="px-4 py-3">
                          {" "}
                          <img
                            src={`https://server.skoshoes.store/uploads/${booking.VenueId.image?.files[0]?.filename}`}
                            alt="Photographer Image"
                            className="h-10 w-10 rounded-full"
                          />
                        </td>

                        <td className="px-4 py-3">{booking.VenueId.name}</td>

                        <td className="px-4 py-3">
                          {booking.VenueId.rent}
                          <br />
                          (paid={booking.VenueId.rent * 0.1})
                        </td>
                        <td className="px-4 py-3">
                          {new Date(booking.createdAt).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {new Date(booking.Date).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={()=>handlephotocancel(booking._id,'venue')}
                            class="inline-block rounded bg-green-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                          >
                            Cancel
                          </button>
                        </td>
                        
                      </tr>
                    ))}
                </table>
              </table>
            )}

            {activeTab === "decor" && (
              <table className="mt-5 mx-auto">
                <caption className="text-lg text-center font-bold m-5">
                  Decor bookings
                </caption>
                <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
                  <thead>
                    <tr className="text-left border-b-2 border-gray-300">
                    <th className="px-4 py-3">Image Of Event</th>
                      <th className="px-4 py-3">Name of Company</th>
                      <th className="px-4 py-3">Payment Amount</th>
                      <th className="px-4 py-3">Booking Date</th>
                      <th className="px-4 py-3">Event Date</th>
                    </tr>
                  </thead>
                  {decor &&
                    decor.map((booking) => (
                  <tr
                        key={booking.id}
                        className="bg-gray-100 border-b border-gray-200"
                      >
                        <td className="px-4 py-3">
                        
                          <img
                            src={`https://server.skoshoes.store/uploads/${booking.DecorId.image[0]?.files[0]?.filename}`}
                            alt="Decor Image"
                            className="h-10 w-10 rounded-full"
                          />
                        </td>

                        <td className="px-4 py-3">  {booking.DecorId.name}</td>

                        <td className="px-4 py-3">
                          {booking.DecorId.rent}
                          <br />
                          (paid={booking.DecorId.rent * 0.1})
                        </td>
                        <td className="px-4 py-3">
                          {new Date(booking.createdAt).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {new Date(booking.Date).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={()=>handlephotocancel(booking._id,'decor')}
                            class="inline-block rounded bg-green-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                          >
                            Cancel
                          </button>
                        </td>
                        
                      </tr>
                    ))}
                </table>
              </table>
            )}

            {activeTab === "cater" && (
              <table className="mt-5 mx-auto">
                <caption className="text-lg text-center font-bold m-5">
                  Catering bookings
                </caption>
                <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
                  <thead>
                    <tr className="text-left border-b-2 border-gray-300">
                    <th className="px-4 py-3">Image Of Event</th>
                      <th className="px-4 py-3">Name of Company</th>
                      <th className="px-4 py-3">Menu</th>
                      <th className="px-4 py-3">Payment Amount</th>
                      <th className="px-4 py-3">Booking Date</th>
                      <th className="px-4 py-3">Event Date</th>
                    </tr>
                  </thead>
                  {cater &&
                    cater.map((booking) => (
                      <tr
                        key={booking.id}
                        className="bg-gray-100 border-b border-gray-200"
                      >
                        <td className="px-4 py-3">
                          <img
                            src={`https://server.skoshoes.store/uploads/${booking.CaterId.image[0]?.files[0]?.filename}`}
                            alt="Decor Image"
                            className="h-10 w-10 rounded-full"
                          />
                        </td>

                        <td className="px-4 py-3">{booking.CaterId.name}</td>
                        <td className="px-4 py-3">{booking.CaterId.menu}</td>

                        <td className="px-4 py-3">
                          {booking.CaterId.rent}
                          <br />
                          (paid={booking.CaterId.rent * 0.1})
                        </td>
                        <td className="px-4 py-3">
                          {new Date(booking.createdAt).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {new Date(booking.Date).toLocaleDateString("en-GB")}
                        </td>

                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={()=>handlephotocancel(booking._id,'cater')}
                            class="inline-block rounded bg-green-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                </table>
              </table>
            )}
            {activeTab === "make" && (
              <table className="mt-5 mx-auto">
                <caption className="text-lg text-center font-bold m-5">
                  Makeup bookings
                </caption>
                <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
                  <thead>
                    <tr className="text-left border-b-2 border-gray-300">
                    <th className="px-4 py-3">Image Of Event</th>
                      <th className="px-4 py-3">Name of Company</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Payment Amount</th>
                      <th className="px-4 py-3">Booking Date</th>
                      <th className="px-4 py-3">Event Date</th>
                    </tr>
                  </thead>
                  {make &&
                    make.map((booking) => (
                      <tr
                        key={booking.id}
                        className="bg-gray-100 border-b border-gray-200"
                      >
                        <td className="px-4 py-3">
                          <img
                            src={`https://server.skoshoes.store/uploads/${booking.MakeId.image[0]?.files[0]?.filename}`}
                            alt="Makeup Image"
                            className="h-10 w-10 rounded-full"
                          />
                        </td>

                        <td className="px-4 py-3">{booking.MakeId.name}</td>

                        <td className="px-4 py-3">{booking.MakeId.type}</td>

                        <td className="px-4 py-3">
                          {booking.MakeId.rent}
                          <br />
                          (paid={booking.MakeId.rent * 0.1})
                        </td>
                        <td className="px-4 py-3">
                          {new Date(booking.createdAt).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {new Date(booking.Date).toLocaleDateString("en-GB")}
                        </td>

                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={()=>handlephotocancel(booking._id,'make')}
                            class="inline-block rounded bg-green-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                </table>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
