import React, { useState, useEffect } from "react";
import axios from "../../instance/axios";
import { FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import BaseTable from "../../Component/Basetable";
import { NavLink, Link, Navigate, Await } from "react-router-dom";
import Superadminbar from "../../Component/Superadminbar";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2';


const Adminview = () => {
  const { superadmin } = useAuthContext();
  const [admin, setadmin] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAdmin, setFilteredAdmin] = useState([]);
  const [loading, setloading] = useState(true);

  const getAdmin = async () => {
    try {
      const response = await axios.get("/superadmin/viewadmin", {
        headers: {
          Authorization: `${superadmin.token}`,
        },
      });
      const { message, data } = response.data;
      console.log(data);

      console.log("successful");
      setadmin(data.reverse());
      setFilteredAdmin(data);

      toast(message);

      setloading(false);
    } catch (error) {}
  };

  const handleBlock = async (id) => {
    try {
      const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to Block/Unblock the admin details. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
      });
  
      if (confirmResult.isConfirmed) {
        const response=await axios.put(`/superadmin/blockadmin/${id}`, null, {
          headers: {
            Authorization: `${superadmin.token}`
          },
        });
  
        await getAdmin();
        if(response.success==true){
          toast.success(response.data.message);
        }else{
          toast.error(response.data.message)
        }
      
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to block.');
    }
  };
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getAdmin();
  }, []);



  useEffect(() => {
    setFilteredAdmin(
      admin.filter((cat) => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, superadmin]);


  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },

    {
			name: 'Company Name',
			selector: row => row.companyname,
		},
		{
			name: 'Email',
			selector: row => row.email,
		},
		{
			name: 'Phone',
			selector: row => row.mobile,
		},
    {
      name: "View",
      selector: (row) => (
        <>
          <NavLink to={`/superadmin/singleview/${row._id}`}>
          <FaEye className="text-green-900" />
         
          </NavLink>
        </>
      ),
    },
    {
      name: "Edit",
      selector: (row) => (
        <NavLink to={`/superadmin/editadmin/${row._id}`}>
          <FaPencilAlt className="text-green-900" />
        </NavLink>
      ),
    },
    {
      name: "Block",
      selector: (row) => (
        <>
      <button
  onClick={() => handleBlock(row._id)}
  className={`${
    row.isblocked ? 'bg-green-700 ':'bg-red-700'
  } text-white font-bold py-2 px-4 rounded-full`}
>
  {row.isblocked ? "Unblock" : "Block"}
</button>

    </>
      ),
    },
  ];

  return (
    <div>
      <>
        <div className="flex gap-24 mx-auto">
          <Superadminbar />

          <div className="d-flex w-8/12 flex-column align-items-center mx-auto">
            <div className="flex justify-end">
              <NavLink to="/superadmin/addadmin">
                <button class="bg-green-900  text-white font-bold py-2 px-4 rounded-full mt-5 mb-5">
                  ADD NEW ADMIN
                </button>
              </NavLink>
            </div>
            {loading ? (
              <div className="loader-container absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <ClipLoader color={"#808080"} size={150} />
              </div>
            ) : (
              <BaseTable
                columns={columns}
                data={filteredAdmin}
                title={"ADMIN MANAGEMENT"}
                pagination
                fixedHeader
                HighlightOnHover
                subHeader
                subHeaderComponent={
                  <input
                    type="text"
                    placeholder="Search"
                    className="shadow appearance-none border rounded  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black "
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                }
              />
            )}
          </div>
        </div>
      </>
    </div>
  );
};
export default Adminview;
