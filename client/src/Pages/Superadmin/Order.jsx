import React, { useState, useEffect } from 'react';
import axios from '../../instance/axios';
import Basetable from '../../Component/Basetable';
import Superadminbar from '../../Component/Superadminbar';
import { useAuthContext } from '../../Hooks/useAuthContext';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Order() {
  const { superadmin } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const response = await axios.get('/superadmin/orders', {
        headers: {
          Authorization: `${superadmin.token}`,
        },
      });
      const data = response.data;
      const mergedOrders = Object.values(data).flat();
      setOrders(mergedOrders);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
console.log(orders,'8888888888888');
  useEffect(() => {
    getOrders();
  }, []);

  const handleBlock = async (id) => {
    // Your block/unblock logic goes here
  };

  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
        name: "Manager Id",
        selector: (row) => row._id ,
        sortable: true,
      },
    {
      name: "User Id",
      selector: (row) => row.userId ,
      sortable: true,
    },
    {
      name: "Date For Booking",
      selector: (row) => row.Date,
      sortable: true,
    },
    // {
    //   name: "Block",
    //   cell: (row) => (
    //     <button
    //       onClick={() => handleBlock(row._id)}
    //       className={`${row.isBlocked ? 'bg-green-700' : 'bg-red-700'} text-white font-bold py-2 px-4 rounded-full`}
    //     >
    //       {row.isBlocked ? 'Unblock' : 'Block'}
    //     </button>
    //   ),
    // },
  ];

  return (
    <>
      <div>
        <div className='flex gap-24 mx-auto'>
          <Superadminbar />
          <div className='d-flex w-8/12 flex-column align-items-center'>
            {/* Add your search input and button here */}
            {loading ? (
              <div className="loader-container absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <ClipLoader color={"#808080"} size={150} />
              </div>
            ) : (
              <div>
                <Basetable
                  columns={columns}
                  data={orders}
                  title={"ORDER MANAGEMENT"}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
