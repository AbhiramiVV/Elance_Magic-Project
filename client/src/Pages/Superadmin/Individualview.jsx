import React, { useEffect, useState } from "react";
import Superadminbar from "../../Component/Superadminbar";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from '../../instance/axios';
import { useAuthContext } from "../../Hooks/useAuthContext";
import ClipLoader from "react-spinners/ClipLoader";

const Individualview = () => {
  const { id } = useParams("");
  console.log(id);
  const { superadmin } = useAuthContext();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const viewsingle = async () => {
      try {
        const res = await axios.get(`/superadmin/viewadminsingle/${id}`, {
          headers: {
            Authorization: `${superadmin.token}`,
          },
        });
        const userindividual = res.data;

        setCompanyName(userindividual.comapanyname);
        setCategory(userindividual.category);
        setEmail(userindividual.email);
        setMobile(userindividual.mobile);
        setPlace(userindividual.place);
        setDescription(userindividual.description);
        setImage(userindividual.image);
      } catch (error) {
        // Handle error
      }
      setLoading(false);
    };

    viewsingle();
  }, [id, superadmin.token]);

  const handleApprove = (id) => {
    axios
      .get(`/superadmin/approved/${id}`, {
        headers: {
          Authorization: `${superadmin.token}`,
        },
      })
      .then((response) => {
        if (!response.data.err) {
          navigate("/superadmin/getadmin",);
        }
      });
  };

  const handleReject = (id) => {
    axios
    .get(`/superadmin/reject/${id}`, {
      headers: {
        Authorization: `${superadmin.token}`,
      },
    })
    .then((response) => {
      if (!response.data.err) {
        navigate("/superadmin/getadmin",);
      }
    });
    
  };

  return (
    <div className="flex gap-24">
      <Superadminbar />
      {loading ? (
        <div className="loader-container absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <ClipLoader color={"#808080"} size={150} />
        </div>
      ) : (
        <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">
          <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
            <div id="profile" className="w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0 pl-4">
              <div className="p-4 md:p-12 text-center lg:text-left">
                <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
                  <img className="rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" src={image} alt="" />
                </div>
                <h1 className="text-3xl font-bold pt-8 lg:pt-0">{companyName}</h1>
                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                <p className="pt-4 text-xl text-black font-bold flex items-center justify-center lg:justify-start">PERSONAL DETAILS</p>
                <p className="pt-4 text-base text-blue-950 font-bold flex items-center justify-center lg:justify-start">Services:<p className="text-black">{category}</p></p>
                <p className="pt-4 text-base text-blue-950 font-bold flex items-center justify-center lg:justify-start">Email:<p className="text-black">{email}</p></p>
                <p className="pt-4 text-base text-blue-950 font-bold flex items-center justify-center lg:justify-start">Mobile: <p className="text-black">{mobile}</p></p>
                <p className="pt-4 text-base text-blue-950 font-bold flex items-center justify-center lg:justify-start">Place: <p className="text-black">{place}</p></p>
                <p className="pt-4 text-base text-blue-950 font-bold flex items-center justify-center lg:justify-start">Description: <p className="text-black">{description}</p></p>
                <div className="pt-12 pb-8">
                  <NavLink to='/superadmin/getadmin'>
                    <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">HOME</button>
                  </NavLink>
                  <button onClick={() => handleApprove(id)} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                    Approve
                  </button>
                  <button onClick={() => handleReject(id)} className="bg-green-700 hover:bg-read-900 text-white font-bold py-2 px-4 rounded-full">
                    Reject
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/5">
              <img src={image} className="rounded lg:rounded-lg shadow-2xl hidden lg:block" alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Individualview;
