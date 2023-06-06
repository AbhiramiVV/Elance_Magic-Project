import React ,{useState} from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from 'react-toastify'


import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import axios  from '../instance/axios'
import { useAuthContext } from '../Hooks/useAuthContext'

const OurGalary = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const {admin}=useAuthContext();
  {passwordVisible ? (
    <FiEye size={38} opacity={0.6} />
  ) : (
    <FiEyeOff size={38} opacity={0.6} />
  )}
  const deleteHandler = async () => {
    try {
      await axios.post('/vendor/removeImage', { imageUrl: props.image},
       {
          headers: {
            Authorization: admin.token,
          },
        }
      ).then((response)=>{
        if (response.status === 201) {
          props.delete == false ? props.isDelete(true) : props.isDelete(false)
          toast({
            position: "top",
            variant: 'left-accent',
            status: 'success',
            isClosable: true,
            title: 'Image removed successfully',
  
          })
  
        } else {
  
          toast({
            position: "top",
            variant: 'left-accent',
            status: 'error',
            isClosable: true,
            title: 'Image removing failed',
  
          })
        }

      });
     
    } catch (error) {

    }
  }

  return (
    <div className='mb-7 p-2 lg:w-[500px] relative text-white lg:h-[400px] md:w-[370px] md:h-[270px] w-[330px] h-[250px] rounded-2xl shadow-lg shadow-black flex items-center justify-center bg-black'>
      <AiFillCloseCircle onClick={onOpen} className='text-white text-3xl absolute top-4 right-4 hover:scale-110 hover:text-red-500' />
      <img className='max-h-[90%] hover:scale-110 hover:duration-300' src={props.image} alt="images" />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Image
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => { deleteHandler(); onClose() }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}

export default OurGalary
