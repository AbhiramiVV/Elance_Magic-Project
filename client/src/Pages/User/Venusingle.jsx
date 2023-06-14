import React, { useEffect, useState } from "react";
import Header from '../../Component/Header';
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "../../instance/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Navigate } from "react-router-dom";

function Venusingle() {
  const { id } = useParams();
  const { user } = useAuthContext();
  console.log(id);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setloading] = useState(true);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [type, setType] = useState("");
  const [rent, setRent] = useState("");
  const [image, setImage] = useState("");
  const [address, setaddress] = useState("");
  const [location, setlocation] = useState("");
  const [seats, setseats] = useState("");
  const [modal, setModal] = useState(false);
   const [isExist, setExist] = useState(false);
   const[amountpay,setAmountpay]=useState(0)
  const handleDateChange = async(date) => {
    console.log(date)
    setSelectedDate(date);
    try {
     
      
      const response = await axios
      .post(`/checkvenueDate/${id}`,
      {
        date,
      },
      {
        headers: {
          Authorization: `${user.token}`,
        },
      })
      console.log(response.data.isExist)
      setExist(response.data.isExist)
     
     
  } catch (error) {}
  };

 const bookVenue = async () => {

    try {
     
      
      const response = await axios
      .post(`/BookVenue/${id}`,
      {
        selectedDate,
      },
      {
        headers: {
          Authorization: `${user.token}`,
        },
      })
      console.log(response.data.message)
      console.log(response.data.status)
      toast.success(response.data.message);
     
  } catch (error) {}
};




const viewVenueSingle = async () => {
  try {
    const res = await axios.get(`/singleVenue/${id}`,{
      headers: {
        Authorization: `${user.token}`,
      },
    });
    const venuesingle = res.data;
    setname(venuesingle.name);
    setdescription(venuesingle.description);
    setType(venuesingle.type);
    setRent(venuesingle.rent);
    setImage(venuesingle.image);
    setaddress(venuesingle.address);
    setlocation(venuesingle.location);
  
    setseats(venuesingle.seats);


    const amountpay=(venuesingle.rent)*0.1
console.log(amountpay)
setAmountpay(amountpay)
    setloading(false);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
   
    viewVenueSingle();
  }, [id]);

  return (
    <>
      <Header />
      <div className="bg-white">
      {loading ? (
             <div className="loader-container absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
             <ClipLoader color={'#808080'} size={150} />
           </div>
            ) : (
           <div class="flex flex-col md:lg:xl:flex-row bg-white">
          <div class="h-screen w-screen md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center">
            {/* <div class="h-screen w-screen md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center shadow-2xl "> */}

            <div class="bg-white p-8 rounded-xl w-96 shadow-2xl mx-auto flex flex-col items-center justify-center mt-20">
              <div class="flex justify-between mb-4 text-center mx-auto">
                <div>
                  <img
                    src={image[2]}
                    className="w-50 h-50 mx-auto"
                    alt="Avatar"
                  />
                  <p class="text-lg font-semibold text-neutral-700">{name}</p>
                    <span class="text-orange-500  mt-6 px-3 text-sm py-1.5 bg-red-50 rounded-lg font-bold">
                    {description}
              </span>
                  <p class="mt-0.5  text-black text-sm">
                    <span className="text-black font-extrabold">Category:</span>{" "}
                    {type}
                  </p>
                 
                  <p class="mt-0.5  text-black text-sm">
                    <span className="text-red-900 font-extrabold">
                     Address:
                    </span>{" "}
                    {address} 
                  </p>
                  <p class="mt-0.5  text-black text-sm">
                    <span className="text-red-900 font-extrabold">Location:</span>{" "}
                    {location}
                  </p>
                  <p class="mt-0.5  text-black text-sm">
                    <span className="text-red-900 font-extrabold">Seats:</span>{" "}
                    {seats}
                  </p>
                  <p class="mt-0.5  text-black text-sm">
                    <span className="text-red-900 font-extrabold">Rent:</span>{" "}
                    {rent}
                  </p>
                </div>
              </div>
<div className="flex flex-col items-center justify-center mt-2">
                      <DatePicker
                        selected={selectedDate}
                        name='date'
                        onChange={handleDateChange}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        className="rounded-lg p-2 border border-gray-400 text-black"
                        placeholderText="Select a date"
                        calendarClassName="bg-white rounded-lg shadow-lg"
                        withPortal
                      />
                      </div>
                   
                      {isExist?<p className="mt-4 bg-black text-white text-xl font-bold py-2 px-12 rounded justify-end">Sorry.photographer is not available on this date</p>:
                      <button className="mt-4 bg-black text-white text-xl font-bold py-2 px-12 rounded justify-end"  onClick={() => setModal(!modal)}>
                        Book Now
                      </button>
                      }
            </div>
          </div>


          <div class="md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center">
            <div class="grid grid-cols-2 gap-2 mt-20 mr-8">
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src={image[1]}
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src={image[2]}
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src={image[3]}
                  alt=""
                />
              </div>
              <div>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src={image[0]}
                  alt=""
                />
              </div>
            </div>
          </div>
          {modal && (
            <div className="fixed z-20 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
              <div className="bg-white p-2 rounded w-96 m-5">
                <div className="flex justify-between">
                  <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
                    {"Details"}
                  </h1>
                  <button
                    className="font-semibold mr-3 mb-8 text-xl"
                    onClick={() => setModal(!modal)}
                  >
                  X
                  </button>
                </div>
                <div className="flex flex-col  p-5">
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AR986YBuyOzayvXPq1yaXyQwaZ1oCETTKjCekqO_-iWm_EWpSkI3ZeWu2aNUAMyukJ4aIAkbQNWEqNa-",
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [{ amount: { value: rent*0.1 } }],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        await actions.order.capture();
                        bookVenue(selectedDate);
                      }}
                      onCancel={() => {
                        toast.error("Payment cancelled");
                      }}
                      onError={() => {
                        toast.error("Payment failed");
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          )}
        </div>
            )}
      </div>
    </>
  );
}



export default Venusingle;
