import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "../../instance/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Theme, useTheme } from '@mui/material/styles';
import { useAuthContext } from "../../Hooks/useAuthContext";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import chatLogo from "../../assets/chat.png"
import OutlinedInput from '@mui/material/OutlinedInput';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
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
  'Floral Decorations',
  'Personalized Touches',
  'Lighting Effects',
  'Themed Decor',
  'Balloon Decorations',
  'Table Settings',
  'Signage and Backdrops',
  'Hanging Installations',
  'Fabric Draping',
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function Decorsinglepage() {
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
  const navigate=useNavigate();
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [type, setType] = useState("");
  const [rent, setRent] = useState("");
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setloading] = useState(true);
  const [isExist, setExist] = useState(false);
  const [Id,setId]= useState("")

  const [paymentOption, setPaymentOption] = useState("advance");
const[amountpay,setAmountpay]=useState(0)
  const handleDateChange = async(date) => {
    console.log(date)
    setSelectedDate(date);
    try {
     
      
      const response = await axios
      .post(`/checkdecorDate/${id}`,
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
      navigate("/success");

     
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
    ["Total Amount", (rent), "", ""],
    ["Advace Amount", (rent)/2, "", ""],
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
const senderId=user.userExist._id;

const chatHandler = async () => {
  try{

  
    const response=await axios.post('/chat', {senderId, Id},{
      headers: {
        Authorization: `${user.token}`,
      }})
   
  
if (response.data.sucess) {
  navigate('/chat');
} else {
  
  console.log('Chat creation failed');
}
} catch (error) {
// Handle error
console.error(error);
}
};


  const viewDecorSingle = async () => {
    try {
      const res = await axios.get(`/singleDecor/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      const Decorsingle = res.data;
      setname(Decorsingle.name);
      setdesc(Decorsingle.desc);
      setType(Decorsingle.type);
      setRent(Decorsingle.rent);
      setImage(Decorsingle.image);
      setId(Decorsingle.VendorId)
const amountpay=(Decorsingle.rent)/2
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
                    src={`https://server.skoshoes.store/uploads/${image[0]?.files[0]?.filename}`}
                    className="w-50 h-50 mx-auto"
                    alt="Avatar"
                  />
                  <p class="text-lg font-semibold text-neutral-700">{name}</p>
                  <span class="text-orange-500  mt-6 px-3 text-sm py-1.5 bg-red-50 rounded-lg font-bold">
                    {desc}
                  </span>
                  <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <p class="mt-0.5  text-black text-sm">
                      <span className="text-red-900 font-extrabold">Total Amount(include GST)/PER DAY:</span>{" "}
                      {rent}
                    </p>
                    <p class="mt-0.5  text-black text-sm">
                      <span className="text-red-900 font-extrabold">Advace Amount:</span>{" "}
                      {(rent)/2}
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
              {isExist ? (
  <p className="mt-4 bg-black text-white text-xl font-bold py-2 px-12 rounded justify-end">
    Sorry, the decoratiom is not available on this date
  </p>
) : (
  <div>
    <div className="flex justify-center items-center mt-4">
      <button
        className={`bg-black text-white text-xl font-bold py-2 px-12 rounded mr-2 ${
          paymentOption === "advance" ? "bg-green-500" : "bg-gray-500"
        }`}
        onClick={() => {
          setPaymentOption("advance");
          setModal(true); // Add this line to open the payment modal
        }}
      >
        Advance Payment
      </button>
      <button
        className={`bg-black text-white text-xl font-bold py-2 px-12 rounded ml-2 ${
          paymentOption === "full" ? "bg-green-500" : "bg-gray-500"
        }`}
        onClick={() => {
          setPaymentOption("full");
          setModal(true); // Add this line to open the payment modal
        }}
      >
        Full Payment
      </button>
    </div>
   
  </div>
)}
       <button onClick={chatHandler} className="p-4 font-bold cursor-pointer flex items-center">
      <img src={chatLogo} alt="Chat Logo" className="w-10 h-10 mr-4" />
      Chat With Us
    </button>

            </div>
          </div>

          <div class="md:lg:xl:w-1/2 bg-white flex flex-wrap justify-end content-center mx-auto">
          <div class="grid grid-cols-2 gap-2 mt-20 mr-8">
          <Carousel showThumbs={false}>
    {image[0]?.files.map((file, index) => (
      <div key={index}>
        <img
          src={file?`https://server.skoshoes.store/uploads/${file.filename}`:''}
          alt={`Carousel Item ${index}`}
        />
      </div>
    ))}
  </Carousel>
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
                  {paymentOption === "advance" ? (
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                        process.env.REACT_APP_ACCESS_KEY,
                        
                      }}
                    >
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [{ amount: { value:rent/2 } }],
                          });
                        }}
                        onApprove={async (data, actions) => {
                          await actions.order.capture();
                          BookDecor(selectedDate);
                          generateInvoice(); 
                        }}
                        onCancel={() => {
                          toast.error("Payment cancelled");
                        }}
                        onError={() => {
                          // toast.error("Payment failed");
                        }}
                      />
                    </PayPalScriptProvider>
                     ) : (
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                          process.env.REACT_APP_ACCESS_KEY,

                          
                        }}
                      >
                        <PayPalButtons
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [{ amount: { value: rent } }],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            await actions.order.capture();
                            BookDecor(selectedDate);
                            generateInvoice(); 
                          }}
                          onCancel={() => {
                            toast.error("Payment cancelled");
                          }}
                          onError={() => {
                            // toast.error("Payment failed");
                          }}
                        />
                      </PayPalScriptProvider>
                    )}
                  </div>
                </div>
              </div>
            )}
       </div>
      </div>
   
    </>
  );
}

export default Decorsinglepage;
