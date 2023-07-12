import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import userRegister from "../../assets/userRegister.jpg";
import logo from "../../assets/logo.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogin } from "../../Hooks/User/useLogin";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Userlogin() {
  const { login, error, isloading } = useLogin();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(""); // State variable to hold the login error message

  const handleLogin = async (values) => {
    try {
      await login(values.email, values.password);
      if (error) {
        setLoginError(error); // Update the login error message in the state
        toast.error(error); // Display the error message using react-toastify or any other toast library
      }
    } catch (error) {
      console.log("An error occurred during login:", error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${userRegister})`, backgroundSize: "cover" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block h-full">
          <img className="absolute inset-0 m-0 h-full overflow-hidden rounded-none p-5 ml-25" style={{ marginLeft: "400px" }} />
        </div>
        <div className="flex flex-col justify-center" style={{ marginRight: "200px" }}>
          <img className="w-40 h-40 mx-auto object-cover" src={logo} />

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin} // Use the updated login handler function
          >
            {({ handleSubmit }) => (
              <form
                className="max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg"
                onSubmit={handleSubmit}
              >
                <h2 className="text-4xl dark:text-white font-bold text-center">
                  LOGIN HERE
                </h2>
                <div className="flex flex-col py-2">
                  <label>Email</label>
                  <Field
                    className="rounded-lg"
                    type="text"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex flex-col py-2">
                  <label>Password</label>
                  <Field
                    className="rounded-lg"
                    type="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <button
                  className="bg-black text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  LOGIN
                </button>
                <div className="flex mx-auto font-bold">
                  <p className="flex items-center">
                    Don't have an account?
                    <span className="p-2 underline">
                      <NavLink to="/register">Sign up</NavLink>
                    </span>
                  </p>
                </div>
                <div className="flex mx-auto font-bold">
                  <Link to="/forgotPassword">
                    <p className="flex items-center">Forgot password?</p>
                  </Link>
                </div>
                {loginError && (
                  <div className="text-red-500">{loginError}</div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Userlogin;