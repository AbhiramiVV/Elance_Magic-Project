import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from '../instance/axios'
import { useToast } from '@chakra-ui/toast';


const AddServiceModal = ({ visible, onClose, inService }) => {
  // console.log(inService);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  
  const toast = useToast();

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose()
  };

  const changeData = (e) => {

    setError("")
    inService.includes(e.target.value) ? setError("selection already includes") : e.target.value == "#" ? setError("Select one") : setData(e.target.value)

  }

  const saveHandler = async () => {
    if (data != "") {
      const response = await axios.post('/vendor/addService', { data },{
          headers: {
            Authorization: admin.token,
          },
        })
      if (response.status === 201) {
        toast({
          position: "top",
          variant: 'left-accent',
          status: 'success',
          isClosable: true,
          title: 'Service added successfully',

        })
        onClose()
      } else {
        setError("select one")
        toast({
          position: "top",
          variant: 'left-accent',
          status: 'error',
          isClosable: true,
          title: 'Service adding failed',

        })
      }
    } else {
      setError("Select one item")
    }
  }

  if (!visible) return null;
  return (
    <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center'>

      <div className='bg-white w-[500px] h-[500px] flex flex-col rounded-3xl m-2'>
        <div className='flex flex-row-reverse text-4xl p-4 border-b-2 border-black'>
          <button onClick={onClose} ><AiFillCloseCircle /></button>
        </div>
        <div className='h-full w-full flex items-center justify-center flex-col'>
          <h1 className='text-3xl font-semibold mb-8'>Add Service</h1>
          {/* <input onChange={(e) => setData(e.target.service)} type="text" name='service' value={data} className='border-2 border-gray-400 rounded-3xl h-16 w-[85%] text-xl font-semibold p-4' /> */}
          <select
            name="service"
            value={data}
            onChange={changeData}
            // onMouseEnter={setError("")}
            className='border-2 border-gray-400 rounded-3xl h-16 w-[85%] text-xl font-semibold p-4'>
            <option value="#">--Select Services--</option>
            <option value="Wedding planning">Wedding planning</option>
            <option value="Personal events">Personal events</option>
            <option value="Commercial events">Commercial events</option>
            <option value="Birthday party">Birthday party</option>
            <option value="Live music & orchestra" placeholder='fj'>Live music & orchestra</option>
            <option value="Entertainment shows">Entertainment shows</option>
            <option value="Bridal makeup">Bridal makeup</option>
            <option value="Photography">Photography</option>
            <option value="Travels">Travels</option>
            <option value="Catering services">Catering services</option>
            <option value="Decoration">Decoration</option>
            <option value="Security">Security</option>
          </select>
          {error != "" && <p className='text-red-600'>{error}</p>}
          <button onClick={saveHandler} className='bg-green-500 hover:bg-green-600 rounded-3xl h-16 w-[60%] text-lg font-medium mt-6 p-4 uppercase'>save</button>
        </div>
      </div>


    </div>
  )
}

export default AddServiceModal
