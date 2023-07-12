import { useState } from "react";
import { useAuthContext } from "../useAuthContext";
import axios from '../../instance/axios';

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post('/login', { email, password })
      console.log(response,'888888888888');
      const json = response.data.json
      const userExist=response.data.userExist
      // save the user to the local storage
      localStorage.setItem('user', JSON.stringify(response.data))

      // update the auth context
      dispatch({ type: 'LOGIN', payload:response.data})

      setIsLoading(false)
    } catch (error) {
      console.log(error.message);
      setIsLoading(false)
      setError(error.response.data.message)
    }
  }

  return { login, isLoading, error }
}