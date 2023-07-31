import React, { useEffect, useState } from 'react';
import ServicesCard from '../../Component/ServiceCard';
import axios from '../../instance/axios';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { toast } from 'react-toastify';
import AddServiceModal from '../../Component/AddServiceModal';

const ProviderProfile = () => {
  const { admin } = useAuthContext();
  const [addService, setAddService] = useState(false);
  const [data, setData] = useState("");
  const [serviceDelete, setServiceDelete] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = admin.adminExist[0]._id;
        const response = await axios.get(`/vendor/providerDetails/${id}`, {
          headers: {
            Authorization: `${admin.token}`,
          },
        });
        if (response.status === 200) {
          setData(response.data.data);
          setCategory(response.data.data.category);
        } else {
          toast.error("Server error");
        }
      } catch (error) {
        toast.error("Server error");
      }
    };

    fetchData();
  }, [addService, serviceDelete, admin]);

  const handleDelete = async (name) => {
    try {
      const response = await axios.post(
        '/vendor/removeService',
        { name, data },
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );

      if (response.status === 201) {
        setServiceDelete(!serviceDelete);
        toast.success('Service removed successfully');
      } else {
        toast.error('Service removing failed');
      }
    } catch (error) {
      toast.error('Service removing failed');
    }
  };

  return (
    <div>
      <div className="w-full bg-slate-300 py-10">
        <div className="w-full max-w-[900px] mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="lg:text-4xl text-2xl font-semibold font-Volkhov">{data.companyname}</h2>
            <Link to="/vendor/editProfile" className="bg-white border-black border-2 w-24 h-10 rounded-full flex items-center justify-center text-base font-semibold hover:shadow-md uppercase hover:bg-[#E1EDF8] hover:scale-105">Edit</Link>
          </div>
          <p className="text-center text-base">{data.description}</p>
        </div>
      </div>
      <div className="w-full mt-10 flex flex-col items-center justify-center mx-auto max-w-[900px]">
        <h3 className="text-2xl font-semibold font-Volkhov mb-4">Services We Provide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.category ? (
            category.map((service) => (
              <div key={service.id} className="flex flex-col items-center">
                <ServicesCard service={service} />
                <button className="bg-red-500 text-white rounded w-24 h-8 text-xs font-semibold" onClick={() => handleDelete(service)}>Delete</button>
              </div>
            ))
          ) : (
            <h1>Services not available</h1>
          )}
          <div className="flex items-center justify-center">
            <div onClick={() => setAddService(true)} className="w-40 h-10 bg-white rounded-full shadow-lg shadow-black flex items-center justify-center hover:shadow-md hover:shadow-slate-700 text-base font-semibold cursor-pointer hover:text-base hover:scale-95 duration-100">Add Services</div>
          </div>
        </div>
      </div>
    
      <AddServiceModal visible={addService} onClose={setAddService} inService={data.category} />
    </div>
  );
};

export default ProviderProfile;
