
import {BrowserRouter,Routes,Route}from "react-router-dom";
import './App.css';
import User from "./routes/User";
import Admin  from "./routes/Admin";
import Superadmin from "./routes/Superadmin";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from '././instance/axios'
import PageNotFound from "./Component/PageNotFound";


function App() {
    axios.defaults.withCredentials = true;
return(
    <>
    
    <BrowserRouter>
    <Routes>
        
        <Route path="/" element={<User />} />
        <Route path="/vendor/" element={<Admin />} />
        <Route path="/superadmin/" element={<Superadmin />} />
        <Route path="*" element={<PageNotFound />} />
        </Routes>
    
        <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />

    </BrowserRouter>
    </>
)
}

export default App;
