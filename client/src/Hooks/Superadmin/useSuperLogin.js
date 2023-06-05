import { useState } from "react";
import { useAuthContext } from "../useAuthContext";
import axios from '../../instance/axios';

export const useSuperLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.post('/superadmin/superlogin', { email, password })

      const json = response.data
console.log(json);
      // save the user to the local storage
      localStorage.setItem('superadmin', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'SUPERLOGIN', payload: json })

      setIsLoading(false)
    } catch (error) {
      console.log(error.message);
      setIsLoading(false)
      setError(error.response.data.error)
    }
  }

  return { login, isLoading, error }
}
