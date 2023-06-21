import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";
import { useParams} from "react-router-dom";
import axios from "../../instance/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useAuthContext } from "../../Hooks/useAuthContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  'Salads',
  'Main Courses',
  'Desserts',
  'Beverages',
  'Cocktails',
  'Seafood',
  'Vegetarian',
  'Vegan',
  'Gluten-free',
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MakeupSingle() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const { 'target': { value }, } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
    const { id } = useParams();
    const { user } = useAuthContext();
    const [selectedDate, setSelectedDate] = useState(new Date());
   
  
    const [name, setname] = useState("");
    const [desc, setdesc] = useState("");
    const [type, setType] = useState("");
    const [rent, setRent] = useState("");
    const [image, setImage] = useState("");
    const [modal, setModal] = useState(false);
    const [loading, setloading] = useState(true);
    const [isExist, setExist] = useState(false);
  const[amountpay,setAmountpay]=useState(0)
    const handleDateChange = async(date) => {
      setSelectedDate(date);
      try {
       
        
        const response = await axios
        .post(`/checkmakeDate/${id}`,
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
    
    const BookMakeup =  async () => {
  
      try {
       
        
        const response = await axios
        .post(`/BookMake/${id}`,
        {
          selectedDate,
          paymentOption,
        },
        {
          headers: {
            Authorization: `${user.token}`,
          },
        })
        console.log(response.data.message)
        console.log(response.data.status)
        toast.success(response.data.message);
        generateInvoice(name, desc, type, rent, selectedDate);
       
    } catch (error) {}
  };

  const generateInvoice = (name, desc, type, rent, selectedDate) => {
    const doc = new jsPDF();
    // Set the title for the document
    doc.setFontSize(20);
    doc.text("Invoice", 10, 20);
  
    // Define the table columns and rows
    const tableColumns = ["Item", "Description", "Quantity", "Price"];
    const tableRows = [
      ["Name", name, "", ""],
      ["Description", desc, "", ""],
      ["Type", type, "", ""],
      ["Rent", (rent)*0.1, "", ""],
      ["Selected Date", selectedDate.toDateString(), "", ""],
    ];
  
    // Set the table headers and rows using AutoTable plugin
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 30,
    });
  
    // Save the PDF file
    doc.save('invoice.pdf');
  };
  
  
  
  
    const viewMakeSingle = async () => {
      try {
        const res = await axios.get(`/singleMake/${id}`, {
          headers: {
            Authorization: `${user.token}`,
          },
        });
        const Makesingle = res.data;
        setname(Makesingle.name);
        setdesc(Makesingle.desc);
        setType(Makesingle.type);
        setRent(Makesingle.rent);
        setImage(Makesingle.image);
  const amountpay=(Makesingle.rent)*0.1
  console.log(amountpay)
  setAmountpay(amountpay)
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
        viewMakeSingle();
    }, [id]);
    
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
                    {/* <p class="mt-0.5  text-black text-sm">
                      <span className="text-black font-extrabold">Category:</span>{" "}
                      {type}
                    </p> */}
                    <p class="mt-0.5  text-black text-sm">
                      <span className="text-red-900 font-extrabold">Service Charge:</span>{" "}
                      {rent}
                    </p>
                    <p class="mt-0.5  text-black text-sm">
                      <span className="text-red-900 font-extrabold">Advace:</span>{" "}
                      {(rent)*0.1}
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
                          BookMakeup(selectedDate);
                          generateInvoice(); 
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

export default MakeupSingle
