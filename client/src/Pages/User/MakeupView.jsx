import React, { useEffect, useState } from 'react';
import Header from '../../Component/Header';
import axios from '../../instance/axios';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
import ClipLoader from 'react-spinners/ClipLoader';



function MakeupView() {
    const { user } = useAuthContext();
    const [makeup, setMakeup] = useState([]);
    const [loading, setLoading] = useState(true);
    const [makeView, setMakeView] = useState(false);
  
    const getMakeup = async () => {
      try {
        const response = await axios.get('/makeupdisplay', {
          headers: {
            Authorization: `${user.token}`,
          },
        });
        const { message, data } = response.data;
        console.log(data);
  
        setMakeup(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
        getMakeup();
    }, []);
  
    const datas = makeup.map((data) => (
      <div
        className="min-h-screen bg-gray-100 flex justify-center items-center mt-8"
        key={data._id}
      >
        <div className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg w-full mt-10">
          <div className="flex justify-center mt-18">
            <img
              className="rounded-t-lg object-cover w-full h-64"
              src={`https://server.skoshoes.store/uploads/${data.image[0].files[0].filename}`}
              alt=""
            />
          </div>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white text-center">
                {data.name}
              </h5>
            </a>
  
            <div className="container mx-auto p-9 bg-gray-300 max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 mt-0">
              <div className="flex justify-between items-center mt-0">
                <table className="text-xs my-3">
                  <tbody>
                    <tr>
                      <td className="px-2 py-2 text-black text-lg font-extrabold">
                        Type
                      </td>
                      <td className="px-2 py-2 text-lg font-bold">{data.type}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 text-black text-lg font-extrabold">
                        Rent/Day
                      </td>
                      <td className="px-2 py-2 text-lg font-bold">
                        {data.rent}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <NavLink to={`/Makeupsingle/${data._id}`}>
                          <button
                            type="button"
                            className="text-white text-sm font-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          >
                            View
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  
    return (
      <div>
        <Header />
  
        <div className="w-full bg-white">
          {loading ? (
            <div className="loader-container absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <ClipLoader color={'#808080'} size={150} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {datas}
            </div>
          )}
        </div>
      </div>
    );
  }

export default MakeupView
