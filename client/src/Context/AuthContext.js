import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
   
    case "LOGIN":
      return { user: action.payload };
   
    
    case "LOGOUT":
      return { user: null };

   
  case "ADMINLOGIN":
    return { admin: action.payload };
 
  
  case "ADMINLOGOUT":
    return { admin: null };

    case "SUPERLOGIN":
      return { superadmin: action.payload };
   
    
    case "SUPERLOGOUT":
      return { superadmin: null };
  
  default:
    return state;
}
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {

    user: null,
    admin:null,
    superadmin:null
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const admin = JSON.parse(localStorage.getItem("admin"));
    const superadmin = JSON.parse(localStorage.getItem("superadmin"));

    if (user) {
      dispatch({ type: "LOGIN", payload:user });
    }
    if (admin) {
      dispatch({ type: "ADMINLOGIN", payload:admin });
    }
    if (superadmin) {
      dispatch({ type: "SUPERLOGIN", payload:superadmin });
    }
  }, []);
  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
