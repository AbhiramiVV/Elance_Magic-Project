import React, { useState, useEffect } from 'react';
import axios from '../../instance/axios';
import Basetable from '../../Component/Basetable';
import { useAuthContext } from '../../Hooks/useAuthContext';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Adminsidebar from '../../Component/Adminsidebar';

function OrderHistory() {
    const { admin } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [data, setData] = useState(null);
  
    const getOrders = async () => {
        
      try {
        const response = await axios.get('/vendor/orderDetails', {
          headers: {
            Authorization: `${admin.token}`,
          },
        });
  
        const data = response.data;
      console.log(data,'8888888888888');
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      getOrders();
    }, []);
  
    const handleCategoryClick = (category) => {
      setSelectedCategory(category);
    
    };
  
    const getColumns = () => {
      if (selectedCategory === "photo") {
        return [
          {
            name: "#",
            cell: (row, index) => <div>{index + 1}</div>,
          },
          {
            name: "Name of Customer",
            cell: (row) => <div>{row.userId.name}</div>,
            sortable: true,
          },
          {
            name: "Name Of Management Team",
            cell: (row) => <div>{row.PhotoId.pname}</div>,
            sortable: true,
          },
          {
            name: "Date of Event",
            cell: (row) => <div>{row.Date}</div>,
            sortable: true,
          },
          {
            name: "Payment Amount",
            cell: (row) => <div>{row.PhotoId.rate}</div>,
            sortable: true,
          },
        ];
      } else if (selectedCategory === "cater") {
        return [
          {
            name: "#",
            cell: (row, index) => <div>{index + 1}</div>,
          },
          {
            name: "Name of Customer",
            cell: (row) => <div>{row.userId.name}</div>,
            sortable: true,
          },
          {
            name: "Name Of Management Team",
            cell: (row) => <div>{row.CaterId.name}</div>,
            sortable: true,
          },
          {
            name: "Date of Event",
            cell: (row) => <div>{row.Date}</div>,
            sortable: true,
          },
          {
            name: "Payment Amount",
            cell: (row) => <div>{row.CaterId.rent}</div>,
            sortable: true,
          },
        ];
      } else if (selectedCategory === "make") {
        return [
          {
            name: "#",
            cell: (row, index) => <div>{index + 1}</div>,
          },
          {
            name: "Name of Customer",
            cell: (row) => <div>{row.userId.name}</div>,
            sortable: true,
          },
          {
            name: "Name Of Management Team",
            cell: (row) => <div>{row.MakeId.name}</div>,
            sortable: true,
          },
          {
            name: "Date of Event",
            cell: (row) => <div>{row.Date}</div>,
            sortable: true,
          },
          {
            name: "Payment Amount",
            cell: (row) => <div>{row.MakeId.rent}</div>,
            sortable: true,
          },
        ];
      } else if (selectedCategory === "decor") {
        return [
          {
            name: "#",
            cell: (row, index) => <div>{index + 1}</div>,
          },
          {
            name: "Name of Customer",
            cell: (row) => <div>{row.userId.name}</div>,
            sortable: true,
          },
          {
            name: "Name Of Management Team",
            cell: (row) => <div>{row.DecorId.name}</div>,
            sortable: true,
          },
          {
            name: "Date of Event",
            cell: (row) => <div>{row.Date}</div>,
            sortable: true,
          },
          {
            name: "Payment Amount",
            cell: (row) => <div>{row.DecorId.rent}</div>,
            sortable: true,
          },
        ];
      } else if (selectedCategory === "venue") {
        return [
          {
            name: "#",
            cell: (row, index) => <div>{index + 1}</div>,
          },
          {
            name: "Name of Customer",
            cell: (row) => <div>{row.userId.name}</div>,
            sortable: true,
          },
          {
            name: "Name Of Management Team",
            cell: (row) => <div>{row.VenueId.name}</div>,
            sortable: true,
          },
          {
            name: "Date of Event",
            cell: (row) => <div>{row.Date}</div>,
            sortable: true,
          },
          {
            name: "Payment Amount",
            cell: (row) => <div>{row.VenueId.rent}</div>,
            sortable: true,
          },
        ];
      }
    };
  
    return (
      <>
        <div>
          <div className='flex gap-24 mx-auto'>
            <Adminsidebar/>
            <div className='d-flex w-8/12 flex-column align-items-center'>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className={`bg-black text-white font-bold py-2 px-4 rounded-full ${
                    selectedCategory === "photo" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleCategoryClick("photo")}
                  disabled={selectedCategory === "photo"}
                >
                  Photo
                </button>
                <button
                  className={`bg-black text-white font-bold py-2 px-4 rounded-full ${
                    selectedCategory === "cater" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleCategoryClick("cater")}
                  disabled={selectedCategory === "cater"}
                >
                  Cater
                </button>
                <button
                  className={`bg-black text-white font-bold py-2 px-4 rounded-full ${
                    selectedCategory === "make" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleCategoryClick("make")}
                  disabled={selectedCategory === "make"}
                >
                  Makeup
                </button>
                <button
                  className={`bg-black text-white font-bold py-2 px-4 rounded-full ${
                    selectedCategory === "decor" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleCategoryClick("decor")}
                  disabled={selectedCategory === "decor"}
                >
                  Decoration
                </button>
                <button
                  className={`bg-black text-white font-bold py-2 px-4 rounded-full ${
                    selectedCategory === "venue" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleCategoryClick("venue")}
                  disabled={selectedCategory === "venue"}
                >
                  Venue
                </button>
              </div>
              {loading ? (
                <div className="loader-container absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <ClipLoader color={"#808080"} size={150} />
                </div>
              ) : (
                <div>
                  {selectedCategory && (
                    <Basetable
                      key={selectedCategory}
                      columns={getColumns()}
                      data={data[selectedCategory]}
                      title={selectedCategory}
                      pagination
                      fixedHeader
                      highlightOnHover
                      subHeader
                      subHeaderComponent={
                        <input
                          type="text"
                          placeholder="Search"
                          className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
                        />
                      }
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

export default OrderHistory
