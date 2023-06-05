import { useAuthContext } from "../useAuthContext";

export const useSuperLogout = () => {
    const { dispatch } = useAuthContext()
    const logout = () => {
        localStorage.removeItem('superadmin')
        dispatch({type: 'SUPERLOGOUT'})
    }
    return {logout}
}