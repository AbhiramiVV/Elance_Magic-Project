
import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "../../instance/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

function CateringSingle() {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [selectedDate, setSelectedDate] = useState(new Date());
   
  
    const [name, setname] = useState("");
    const [desc, setdesc] = useState("");
    const [type, setType] = useState("");
    const [rent, setRent] = useState("");
    const [menu,setMenu] =useState("");
    const [image, setImage] = useState("");
    const [modal, setModal] = useState(false);
    const [loading, setloading] = useState(true);
    const [isExist, setExist] = useState(false);
  const[amountpay,setAmountpay]=useState(0)
    const handleDateChange = async(date) => {
      console.log(date)
      setSelectedDate(date);
      try {
       
        
        const response = await axios
        .post(`/checkcaterDate/${id}`,
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
    
    const BookDecor =  async () => {
  
      try {
       
        
        const response = await axios
        .post(`/BookDecor/${id}`,
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
  
  
  
    const viewDecorSingle = async () => {
      try {
        const res = await axios.get(`/singleCater/${id}`, {
          headers: {
            Authorization: `${user.token}`,
          },
        });
        const Catorsingle = res.data;
        setname(Catorsingle.name);
        setdesc(Catorsingle.desc);
        setType(Catorsingle.type);
        setRent(Catorsingle.rent);
        setImage(Catorsingle.image);
        setMenu(Catorsingle.menu);
        console.log(CateringSingle,'+++++++++++');
  const amountpay=(Catorsingle.rent)*0.1
  console.log(amountpay)
  setAmountpay(amountpay)
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      viewDecorSingle();
    }, [id]);
    
  console.log(selectedDate)
    return (
      <>
        <Header />
  
        <div className="bg-white">
       
          <div class="flex flex-col md:lg:xl:flex-row bg-white">
            <div class="h-screen w-screen md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center">
              {/* <div class="h-screen w-screen md:lg:xl:w-1/2 bg-white flex flex-wrap justify-center content-center shadow-2xl "> */}
  
              <div class="bg-white p-8 rounded-xl w-96 shadow-2xl mx-auto flex flex-col items-center justify-center mt-20">
                <div class="flex justify-between mb-4 text-center mx-auto">
                  <div>
                    <img
                      src={`http://localhost:5000/uploads/${image[0]?.files[0]?.filename}`}
                      className="w-50 h-50 mx-auto"
                      alt="Avatar"
                    />
                    <p class="text-lg font-semibold text-neutral-700">{name}</p>
                    <span class="text-orange-500  mt-6 px-3 text-sm py-1.5 bg-red-50 rounded-lg font-bold">
                      {desc}
                    </span>
                    <p class="mt-0.5  text-black text-sm">
                      <span className="text-black font-extrabold">Category:</span>{" "}
                      {type}
                    </p>
                    <p class="mt-0.5  text-black text-sm">
                      <span className="text-black font-extrabold">Menu:</span>{" "}
                      {menu}
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
                          onChange={handleDateChange}
                          minDate={new Date()}
                          dateFormat="dd/MM/yyyy"
                          className="rounded-lg p-2 border border-gray-400 text-black"
                          placeholderText="Select a date"
                          calendarClassName="bg-white rounded-lg shadow-lg"
                          withPortal
                        />
                </div>
  
                     {isExist?<p className="mt-4 bg-black text-white text-xl font-bold py-2 px-12 rounded justify-end">Sorry.Decor team is not available on this date</p>:
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
                    src={`http://localhost:5000/uploads/${image[0]?.files[0]?.filename}`}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src={`http://localhost:5000/uploads/${image[0]?.files[1]?.filename}`}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src={`http://localhost:5000/uploads/${image[0]?.files[2]?.filename}`}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    class="h-auto max-w-full rounded-lg"
                    src={`http://localhost:5000/uploads/${image[0]?.files[3]?.filename}`}
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
                        "Abhp9DIDpqLlpmwjLxCUOBJhsJPefegAgL7aTXjA8Q6CBkR5oV4IeeRI4EpMXjdRjPmdWDWMmgK0T0m2",
                      }}
                    >
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [{ amount: { value:rent*0.1 } }],
                          });
                        }}
                        onApprove={async (data, actions) => {
                          await actions.order.capture();
                          BookDecor(selectedDate);
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
        </div>
     
      </>
    );
  }

export default CateringSingle