import React, { useEffect, useState } from 'react';
import { FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import axios from '../../instance/axios';
import { NavLink } from 'react-router-dom';
import Basetable from '../../Component/Basetable';
import Adminsidebar from '../../Component/Adminsidebar';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../Hooks/useAuthContext';

function Catering() {
  const { admin } = useAuthContext();

  const [catering, setCaterig] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAdmin, setFilteredAdmin] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVenue = async () => {
    try {
      const response = await axios.get('/vendor/catering', {
        headers: {
          Authorization: `${admin.token}`,
        },
      });
      const { message, data } = response.data;
      setCaterig(data.reverse());
      setFilteredAdmin(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching catering view:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete the venue. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      });

      if (confirmResult.isConfirmed) {
        await axios.delete(`/vendor/catering/${id}`, {
          headers: {
            Authorization: `${admin.token}`,
          },
        });
        await fetchVenue();
        toast.success('Catering deleted successfully.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete catering category.');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchVenue();
  }, []);

  useEffect(() => {
    setFilteredAdmin(
      catering.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, catering]);

  const columns = [
    {
      name: '#',
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: 'Image',
      selector: (row) => (
        <img
          width={90}
          height={90}
          src={`https://server.skoshoes.store/uploads/${row.image[0].files[0].filename}`}
          alt={row.name}
        />
      ),
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'View',
      selector: (row) => (
        <NavLink to={`/vendor/singleCatering/${row._id}`}>
          <FaEye className="text-green-900" />
        </NavLink>
      ),
    },
    {
      name: 'Edit',
      selector: (row) => (
        <NavLink to={`/vendor/cateringEdit/${row._id}`}>
          <FaPencilAlt className="text-green-900" />
        </NavLink>
      ),
    },
    {
      name: 'Remove',
      selector: (row) => (
        <button
          onClick={() => handleDelete(row._id)}
          className="bg-red-900 text-white font-bold py-2 px-4 rounded"
        >
          <FaTrashAlt />
        </button>
      ),
    },
  ];

  return (
    <div>
      <>
        <div className="flex gap-24 mx-auto">
          <Adminsidebar />

          <div className="d-flex w-8/12 flex-column align-items-center mx-auto">
            <div className="flex justify-end">
              <NavLink to="/vendor/addCatering">
                <button class="bg-green-900  text-white font-bold py-2 px-4 rounded-full mt-5 mb-5">
                  ADD NEW CATERING
                </button>
              </NavLink>
            </div>
            {loading ? (
              <div className="loader-container absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <ClipLoader color={'#808080'} size={150} />
              </div>
            ) : (
              <Basetable
                columns={columns}
                data={filteredAdmin}
                title={'CATERING MANAGEMENT'}
                pagination
                fixedHeader
                HighlightOnHover
                subHeader
                subHeaderComponent={
                  <input
                    type="text"
                    placeholder="Search"
                    className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
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
}

export default Catering;
