import React, { useState } from 'react'
import { MdBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import axios from '../../instance/axios';
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../assets/logo.jpg";
import event from "../../assets/event-planner.jpg"
import Otp from '../User/Otp';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


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
  'Wedding Planning',
  'Personal Events',
  'Birthday Party',
  'Commercial Events',
  'Live music & orchestra',
  'Entertainment shows',
  'Photography',
  'Travel',
  'Virginia Andrews',
  'Kelly Snyder',
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ProviderSignup = () => {

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const { 'target': { value }, } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const [selectedPlace, setSelectedPlace] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [file, setImage] = useState("")
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const [Inpval, setInpval] = useState({
    companyName: "",
    description: "",
    services: "",
    place: "",
    phone: "",
    email: "",
    password: "",
    certificate: "",
    vendor: false
  });
  const [showOtp, setShowOtp] = useState(false)


  const signupHandle = async (e) => {
    e.preventDefault();

    try {
      axios.post('/vendor/vendorSignup', {
        ...providerData, selectedPlace, selectedService, file, personName
      }, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((data) => {
        console.log(data.data);
        if (!data.data.err) {
          setShowOtp(true)
        }
      })


    } catch (err) {


    }
  };



  const [Optmodal, setOtpmodal] = useState(false)
  const addServiceClose = () => setOtpmodal(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [imageError, setImageError] = useState(false);

  const passwordTypeChange = () => {
    if (!passwordVisible) {
      setPasswordVisible(true);
      setPasswordType("text");
    } else {
      setPasswordVisible(false);
      setPasswordType("password");
    }
  };
  // onClick={()=>setOtpmodal(true)}

  const loginHandle = () => {
    navigate('/vendor/vendor')
  }

  const [services, setServices] = useState([]);
  const [place, setPlace] = useState([]);
  const [providerData, setProviderData] = useState({
    companyName: "",
    description: "",

    place: "",
    phone: "",
    email: "",
    password: "",




  });


  const [validation, setValidation] = useState({
    companyName: {
      status: true,
      message: "",
    },
    description: {
      status: true,
      message: "",
    },
    services: {
      status: true,
      message: "",
    },
    place: {
      status: true,
      message: "",
    },
    email: {
      status: true,
      message: "",
    },
    phone: {
      status: true,
      message: "",
    },
    password: {
      status: true,
      message: "",
    },
    signuoError: {
      status: true,
      message: "",
    },
  });

  const valueSetting = (e) => {
    setProviderData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const selectService = (e) => {
    services.includes(e.target.value) ?
      setServices((prevState) => [...prevState]) :
      setServices((prevState) => [...prevState, e.target.value])
  }

  const backService = () => {
    setServices(services.slice(0, -1))
    servicesCheck()
  }

  // const selectPlace = (e) => {
  //   place.includes(e.target.value) ?
  //     setPlace((prevState) => [...prevState]) :
  //     setPlace((prevState) => [...prevState, e.target.value])
  // }

  const backPlace = () => {
    setPlace(place.slice(0, -1))
    placeCheck()
  }



  const nameCheck = () => {
    if (providerData.companyName.length < 3) {
      setValidation((prevState) => ({
        ...prevState,
        companyName: {
          value: false,
          message: "name must be more than 3 character",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        companyName: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };




  const descriptionCheck = () => {
    if (providerData.description == "") {
      setValidation((prevState) => ({
        ...prevState,
        description: {
          value: false,
          message: "description must be fill",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        description: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };



  const servicesCheck = () => {

    if (services == "") {
      setValidation((prevState) => ({
        ...prevState,
        services: {
          value: false,
          message: "select one category",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        services: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };




  const placeCheck = () => {

    if (place == "") {
      setValidation((prevState) => ({
        ...prevState,
        place: {
          value: false,
          message: "select one place",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        place: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };




  const emailCheck = () => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!providerData.email.match(validRegex)) {
      setValidation((prevState) => ({
        ...prevState,
        email: {
          value: false,
          message: "is this really your email ?",
        },
      }));

      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        email: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };




  const PhoneCheck = () => {

    const expr = /^(91)?[0-9]{10}$/;
    if (!providerData.phone.match(expr)) {
      setValidation((prevState) => ({
        ...prevState,
        phone: {
          value: false,
          message: "is this really your phone ?",
        },
      }));

      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        phone: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };

  const passwordCheck = () => {
    if (providerData.password.length < 8) {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          value: false,
          message: "password  must be more than 8 character",
        },
      }));
      return false;
    } else {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          value: true,
          message: "",
        },
      }));
      return true;
    }
  };
  return (
    !showOtp ?
      <div style={{ backgroundImage: `url(${event})`, backgroundSize: "cover" }}>
        <div className='w-full h-50 grid lg:grid-cols-3 md:grid-cols-5 bg-white'>
          <div className='md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center mb-5'>
            <img src={logo} alt="logo" width={330} />
            <h1 className='font-Viaoda text-7xl mb-10'>SINGUP</h1>
            <input
              type="text"
              name='companyName'
              placeholder='Company Name'
              onChange={valueSetting}
              onBlur={nameCheck}
              value={providerData.companyName}
              className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'
            />
            {!validation.companyName.status && (
              <p className=" text-red-600">{validation.companyName.message}</p>
            )}
            <textarea
              name="description"
              placeholder='Description'
              onChange={valueSetting}
              onBlur={descriptionCheck}
              value={providerData.description}
              className='w-[90%] max-h-40 mt-10 text-3xl border-2 border-black rounded-3xl text-center show-scrollbar'></textarea>
            {!validation.description.status && (
              <p className=" text-red-600">{validation.description.message}</p>
            )}
            <div className='w-[90%] mt-10 text-3xl border-2 border-black rounded-3xl text-center flex flex-col items-center justify-center break-words'>
              <div className='w-[90%] break-words'>{services.join(', ')}</div>

              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
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
            </div>

            {/* {!validation.services.status && (
          <p className=" text-red-600">{validation.services.message}</p>
        )} */}
            <div className='w-[90%] mt-10 text-3xl border-2 border-black rounded-3xl text-center flex flex-col items-center justify-center break-words'>
              <div className=' w-[90%] break-words'>{place.join(' , ')}</div>
              <MdBackspace onClick={backPlace} className='self-end mr-2' />
              <select
                name="place"
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
                onBlur={placeCheck}
                className='h-12 bottom-0 border-none  w-full text-center rounded-3xl'>
                <option value="#">-- Select Places --</option>
                <option value="Alappuzha" >Alappuzha</option>
                <option value="Ernakulam">Ernakulam</option>
                <option value="Idukki">Idukki</option>
                <option value="Kannur">Kannur</option>
                <option value="Kasaragod">Kasaragod</option>
                <option value="Kollam">Kollam</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Wayanad">Wayanad</option>
              </select>
            </div>
            {/* {!validation.place.status && (
          <p className=" text-red-600">{validation.place.message}</p>
        )} */}
            <input
              type="text"
              name='phone'
              value={providerData.phone}
              onChange={valueSetting}
              onBlur={PhoneCheck}
              placeholder='Phone'
              className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'
            />
            {!validation.phone.status && (
              <p className=" text-red-600">{validation.phone.message}</p>
            )}
            <input
              type="email"
              name='email'
              value={providerData.email}
              onChange={valueSetting}
              onBlur={emailCheck}
              placeholder='Email'
              className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'
            />
            {!validation.email.status && (
              <p className=" text-red-600">{validation.email.message}</p>
            )}
            <input
              type={passwordType}
              name='password'
              value={providerData.password}
              onChange={valueSetting}
              onBlur={passwordCheck}
              placeholder='Password'
              className='w-[90%] h-20 mt-10 text-3xl border-2 border-black rounded-3xl text-center'
            />
            <p className="relative w-full ">
              <i className="absolute right-10 bottom-6 z-10 pl-2" onClick={passwordTypeChange}>
                {passwordVisible ? (
                  <FiEye size={38} opacity={0.6} />
                ) : (
                  <FiEyeOff size={38} opacity={0.6} />
                )}
              </i>
            </p>
            {!validation.password.status && (
              <p className=" text-red-600">{validation.password.message}</p>
            )}
            <input
              type="file"
              name='certificate'
              onChange={(e) => setImage(e.target.files[0])}
              className='w-[90%] h-20 mt-10 text-3xl p-4 border-2 border-black rounded-3xl text-center'
            />
            <label htmlFor="file">Gov.Approved Certificate</label>
            {imageError && <p className='text-red-500'>Select one image</p>}


            <button onClick={signupHandle} className='w-[60%] h-20 mt-10 text-3xl font-semibold border-2 border-black rounded-3xl text-center'>Signup</button>
            {!validation.signuoError.status && (
              <p className=" text-red-600">{validation.signuoError.message}</p>
            )}
            <p className='mt-5'>Already a member?<a className='text-blue-900 font-semibold cursor-pointer' onClick={loginHandle}>Login</a></p>
          </div>
          <div className='hidden md:flex items-center flex-col md:col-span-3 lg:col-span-2'>
        <img src={event} alt="LOGIN" className='w-[100%] top-1 sticky' />
      </div>
     

        </div >
      </div>
      : <Otp data={{ ...providerData, vendor: true }} />

  )
}

export default ProviderSignup



