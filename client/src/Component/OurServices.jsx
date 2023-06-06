import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import axios from '../instance/axios';
import { toast, useToast } from 'react-toastify';
import { useAuthContext } from '../Hooks/useAuthContext';

const OurServices = (props) => {
  const { admin } = useAuthContext();
  const toast = useToast();

  const deleteHandler = async () => {
    try {
      await axios
        .post(
          '/vendor/removeService',
          { data: props.text },
          {
            headers: {
              Authorization: admin.token,
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            props.delete === false ? props.isDelete(true) : props.isDelete(false);
            toast({
              position: 'top',
              variant: 'left-accent',
              status: 'success',
              isClosable: true,
              title: 'Service removed successfully',
            });
          } else {
            toast({
              position: 'top',
              variant: 'left-accent',
              status: 'error',
              isClosable: true,
              title: 'Service removing failed',
            });
          }
        });
    } catch (error) {
      // Handle the error
    }
  };

 
    return (
      <div>
        <AiFillCloseCircle onClick={props.onOpen} />
        <h3>{props.text}</h3>
        <AlertDialog isOpen={props.isOpen} onClose={props.onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Delete {props.text}</AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button colorScheme="red" onClick={deleteHandler} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    );
  };

export default OurServices;
