import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import axios from '../../instance/axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Basetable from '../../Component/Basetable'
import Adminsidebar from '../../Component/Adminsidebar'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
import { useAuthContext } from '../../Hooks/useAuthContext'
import ClipLoader from 'react-spinners/ClipLoader';

const Venuecat=()=> {
    const{admin}=useAuthContext()
    const[venuecat,setVenuecat]=useState([])
    const [search, setsearch] = useState("");
     const [filtervenue,setFiltervenue]=useState([])
      const[loading,setloading]=useState(true)

    const fetchVenueCategories = async () => {
        try {
          console.log(venuecat);
          const response = await axios.get('/vendor/Venuedisplay', {
            headers: {
              Authorization: `${admin.token}`,
            },
          });
          const { message, data } = response.data;
        console.log(response.data);
        console.log('Successful');
         setVenuecat(data.reverse());
         setFiltervenue(data);
            setloading(false);

        } catch (error) {
          console.error('Error fetching venue categories:', error);
        }
      };
      
      
      
      const handleDelete = async (id) => {
  try {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete the venue category. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (confirmResult.isConfirmed) {
      
      await axios.delete(`/vendor/deletecat/${id}`, {
        headers: {
          Authorization: `${admin.token}`,
        },
      });
      await fetchVenueCategories();
      toast.success('Venue category deleted successfully.');
    }
  } catch (error) {
    console.log(error);
    toast.error('Failed to delete venue category.');
  }
};
 useEffect(() => {
        fetchVenueCategories();
      }, []);
      useEffect(() => {
        setFiltervenue(
          venuecat.filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()))
        );
      }, [search, admin]);

      const ImgURl='http://localhost:5000/uploads/'

          const columns=[
     {
         name:"#",
         cell:(row,index)=><div>{index+1}</div>,
     },
     {
         name:"Image",
        
         selector:(row)=><img width={90} height={90} src={`http://localhost:5000/uploads/${row.image.filename}`}/>
         
        },
     {
         name:"Name",
         selector:(row)=>row.name,
         sortable:true
     },
    
    
     
    
     {
         name:"Action",
         selector:(row)=><button onClick={()=>handleDelete(row._id)} className='bg-red-900  text-white font-bold  py-2 px-4 rounded'>            <FaTrashAlt /></button>
     },
    
     
     
 ];

     
  return (

 <div>
 <div className='flex gap-24 mx-auto'>
                <Adminsidebar/>
              
                <div className='d-flex w-8/12 flex-column align-items-center mx-auto'>
               <div className="flex justify-end">
                <NavLink to="/vendor/VenueAdd">
                <button class="bg-green-900  text-white font-bold py-2 px-4 rounded-full mt-5 mb-5">
            ADD NEW EVENT CATEGORY
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
                         data={filtervenue}
                        title={"VENUE CATEGORY MANAGEMENT"}
                        pagination
                        fixedHeader
                        HighlightOnHover
                        subHeader
                       
                   />)

                      }</div>
              
            </div>
   

    </div>

    
  )
}

export default Venuecat