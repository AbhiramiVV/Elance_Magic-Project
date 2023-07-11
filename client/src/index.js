import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './Context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthContextProvider>
<App />
</AuthContextProvider>
            
   

);
<ToastContainer
position="top-right"
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


