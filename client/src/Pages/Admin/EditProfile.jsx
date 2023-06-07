import { Button, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { MdBackspace } from 'react-icons/md'
import axios from '../../instance/axios'
import BeatLoader from "react-spinners/BeatLoader";
import { useAuthContext } from '../../Hooks/useAuthContext'
import { Navigate } from 'react-router-dom';

const EditProfile = () => {
const {admin}=useAuthContext();
  const toast = useToast()
  // const [profile, setProfile] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState([]);
  const [load, setLoad] = useState(false);
  

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

    signupError: {
      status: true,
      message: "",
    },
  });

  const selectPlace = (e) => {
    place.includes(e.target.value) ?
      setPlace((prevState) => [...prevState]) :
      setPlace((prevState) => [...prevState, e.target.value])
  }

  const backPlace = () => {
    setPlace(place.slice(0, -1))
    placeCheck()
  }

  const nameCheck = () => {
    if (name.length < 3) {
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
    if (description == "") {
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



  useEffect(() => {
    try {
      const id = admin.adminExist._id;
      axios.get(`/vendor/editProfile/${id}`,{
        headers: {
          Authorization: `${admin.token}`,
        },
      }).then((response) => {
        if (response.status === 201) {
          // setProfile(response.data.profile)
          setName(response.data.profile.companyname)
          setDescription(response.data.profile.description)
          setPlace(response.data.profile.place)
        }
      })
    } catch (error) {
      alert("server error")
    }
  }, []);


  const saveHandler = async () => {
    setLoad(true);
  
    const values = {
      email: admin,
      name,
      description,
      place,
     
    };
  
    
  
    try {
      const response = await axios.patch("/vendor/editProfile", values);
      if (response.status === 201) {
        Navigate('vendor/profile');
        toast({
          position: "top",
          variant: "left-accent",
          status: "success",
          isClosable: true,
          title: "Profile updated successfully",
        });
        Navigate('vendor/profile');
      } else {
        toast({
          position: "top",
          variant: "left-accent",
          status: "error",
          isClosable: true,
          title: "Profile updation failed",
        });
      }
    } catch (error) {
      toast({
        position: "top",
        variant: "left-accent",
        status: "error",
        isClosable: true,
        title: "Profile updation failed",
      });
    }
  
    setLoad(false);
  };
  
  return (
    <div>
      <div className='w-full'>
        <div className='max-w-[1300px]  mx-auto  mt-8 rounded-2xl flex flex-col'>
          {/* <AddCoverPhoto photo={coverPhoto} setCover={setCover} cover={cover} change={setCoverPhoto} />
          <AddDP photo={profilePhoto} setDp={setDp} dp={dp} change={setProfilePhoto} /> */}

          <div className='mx-auto flex flex-col items-center justify-center mt-10 gap-6'>
            <div>
              <label htmlFor="companyName" className='ml-6'>Company Name</label>
              <input type="text" value={name} onBlur={nameCheck} onChange={(e) => setName(e.target.value)} className='border-2 border-black rounded-3xl h-16 w-full text-lg font-medium p-4' />
              {!validation.companyName.status && (
                <p className=" text-red-600">{validation.companyName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="companyName" className='ml-6'>Description</label>
              <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} onBlur={descriptionCheck} className='border-2 border-black rounded-3xl w-full text-lg font-medium p-4' id="" cols="30" rows="10"></textarea>
              {!validation.description.status && (
                <p className=" text-red-600">{validation.description.message}</p>
              )}
            </div>
            <div className='w-full '>
              <label htmlFor="companyName" className='ml-6'>Location</label>

              <div className='w-full  text-xl bg-white border-2 border-black rounded-3xl text-center flex flex-col items-center justify-center break-words'>
                <div className=' w-[90%] break-words'>{place.join(' , ')}</div>
                <MdBackspace onClick={backPlace} className='self-end mr-2 text-3xl' />
                <select
                  name="place"
                  value=""
                  onChange={selectPlace}
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
              {!validation.place.status && (
                <p className=" text-red-600">{validation.place.message}</p>
              )}
            </div>
            <div className='w-full mb-10'>
              {!load ?
                <button onClick={saveHandler} className='bg-green-500 hover:bg-green-600 rounded-3xl h-16 w-full text-2xl font-bold mt-6 p-4 uppercase'>save</button> :
                <Button className=' rounded-3xl h-16 w-full text-2xl font-bold mt-6 p-4 uppercase' height={16} rounded={23} isLoading colorScheme='green' spinner={<BeatLoader size={16} color='white' />}>Click me</Button>
              }
            </div>



          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
