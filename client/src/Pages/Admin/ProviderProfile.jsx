import React, { useEffect, useState } from 'react';
import ServicesCard from '../../Component/ServiceCard';
import GalaryCard from '../../Component/GalaryCard';
import { useNavigate } from 'react-router-dom';
import { MdLibraryAdd } from 'react-icons/md';
import axios from '../../instance/axios';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
import OurGalary from '../../Component/OurGalary';
import { toast } from 'react-toastify';
import AddServiceModal from '../../Component/AddServiceModal';
const ProviderProfile = () => {
  const { admin } = useAuthContext();
  const [addService, setAddService] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [data, setData] = useState("");
  const [serviceDelete, setServiceDelete] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = admin.adminExist._id;
        const response = await axios.get(`/vendor/providerDetails/${id}`, {
          headers: {
            Authorization: `${admin.token}`,
          },
        });
        if (response.status === 200) {
          setData(response.data.data);
          setCategory(response.data.data.category)
        } else {
          toast.error("Server error");
        }
      } catch (error) {
        toast.error("Server error");
      }
    };

    fetchData();
  }, [addService, serviceDelete, addImage, admin]);
  console.log(category);

  const handleDelete = async (name) => {
    try {

      const response = await axios.post(
        '/vendor/removeService',
        { name,data},
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
      <div className={data.coverPhoto ? `bg-black w-full h-[300px] lg:h-[500px] flex relative justify-center` : 'bg-slate-300 w-full h-[300px] lg:h-[500px] flex relative justify-center'} >
        {data.coverPhoto && <div className='w-full h-full bg-cover bg-no-repeat' style={{ backgroundImage: `url(${data.coverPhoto})` }}></div>}
        <Link to="/editProfile" className='bg-white border-black border-2 absolute right-16 top-14 w-48 h-16 rounded-2xl flex items-center justify-center text-xl font-semibold hover:shadow-xl uppercase hover:bg-[#E1EDF8] hover:scale-105'>edit profile</Link>
        <div className='lg:w-[400px] h-[230px] w-[230px] lg:h-[400px] rounded-full bg-slate-300 border-8 border-[#E1EDF8] absolute top-[187px] lg:top-[300px]'>
          {data.profilePhoto && <div className='w-full h-full bg-cover bg-no-repeat bg-center rounded-full' style={{ backgroundImage: `url(${data.profilePhoto})` }}></div>}
        </div>
      </div>
      <div className='w-full mt-40 lg:mt-72 flex flex-col items-center justify-center mx-auto max-w-[900px]'>
        <h2 className='lg:text-5xl text-3xl font-semibold font-Volkhov mb-16'>{data.companyname}</h2>
        <p className='text-center text-lg'>{data.description}</p>
      </div>
      <div className='mx-auto pl-2 pr-2 max-w-[400px] md:max-w-[900px] lg:max-w-[1500px] mt-16'>
        <h3 className='text-3xl font-semibold font-Volkhov mb-10'>Services we provided</h3>
        <div className='grid grid-flow-col grid-cols-4'>
          {data.category ? (
            <div className='grid grid-flow-col gap-3 overflow-x-scroll show-scrollbar mb-10 col-span-3'>
              {category.map((service) => (
                <div key={service.id}>
                  <ServicesCard service={service} />
                  <h1>{service}</h1>
                  <button onClick={()=>handleDelete(service)} >Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <h1>Services not available</h1>
          )}
          <div className='col-span-1 flex items-center justify-center'>
            <div onClick={() => setAddService(true)} className='lg:w-[300px] lg:h-[200px] md:w-[250px] md:h-[125px] w-[200px] h-[80px] bg-white rounded-2xl shadow-lg shadow-black flex items-center justify-center hover:shadow-md hover:shadow-slate-700 uppercase text-lg font-semibold text-center ml-2 hover:text-base cursor-pointer hover:scale-95 duration-100'>add services</div>
          </div>
          
          
        </div>
      </div>
      <div className='mx-auto pl-2 pr-2 max-w-[400px] md:max-w-[900px] lg:max-w-[1500px] mt-16'>
        <h3 className='text-3xl font-semibold font-Volkhov mb-10'>Gallery</h3>
        <div className='grid grid-flow-col grid-cols-3'>
          {data.gallery ? (
            <div className='grid grid-flow-col gap-3 overflow-x-scroll show-scrollbar mb-10 col-span-2'>
              {data.gallery.map((image) => (
                <OurGalary key={image.id} isDelete={setServiceDelete} delete={serviceDelete} image={image} />
              ))}
            </div>
          ) : (
            <h1>Images not available</h1>
          )}
          <div className='col-span-1 md:pl-10'>
            <div onClick={() => setAddImage(true)} className='m-7 left-1 lg:w-[300px] lg:h-[360px] md:w-[250px] md:h-[270px] w-[160px] h-[250px] bg-white rounded-2xl shadow-lg shadow-black flex items-center justify-center hover:shadow-md hover:shadow-slate-700 uppercase text-9xl font-semibold text-center ml-2 hover:text-8xl cursor-pointer hover:scale-95 duration-100'><MdLibraryAdd /></div>
          </div>
        </div>
      </div>
      <AddServiceModal onClose={addServiceClose} inService={data.category} visible={addService} />
    </div>
  );
};

export default ProviderProfile;
