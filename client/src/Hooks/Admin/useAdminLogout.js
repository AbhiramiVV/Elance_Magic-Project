import { useAuthContext } from "../useAuthContext";

export const useAdminLogout = () => {
    const { dispatch } = useAuthContext()
    const logout = () => {
        localStorage.removeItem('admin')
        dispatch({type: 'ADMINLOGOUT'})
    }
    return {logout}
}