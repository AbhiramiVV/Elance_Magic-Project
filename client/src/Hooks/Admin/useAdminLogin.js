import { useState } from "react";
import { useAuthContext } from "../useAuthContext";
import axios from '../../instance/axios';

export const useAdminLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    console.log('login');
    setIsLoading(true)
    setError(null)

    try {
      console.log(email,password)
      const response = await axios.post('/vendor/vendor', { email,password})
      console.log(response,'34567');
      const json = response.data
      console.log(response.data)


      // save the user to the local storage
      localStorage.setItem('admin', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'ADMINLOGIN', payload: json })

      setIsLoading(false)
    } catch (error) {
      console.log(error.message);
      setIsLoading(false)
      setError(error.response.data.message)
    }
  }

  return { login, isLoading, error }
}