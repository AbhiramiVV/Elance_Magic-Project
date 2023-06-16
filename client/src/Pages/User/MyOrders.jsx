import React, { useEffect, useState } from 'react'
import { TbNotesOff } from "react-icons/tb";
import { currentUserId } from '../features/userAuthSlice'
import userAxios from '../config/userAxios'
import OrdersCard from '../components/providerComponents/OrdersCard';
import Navebar from '../components/Navbar';
import Header from '../../Component/Header'
import { useAuthContext } from '../../Hooks/useAuthContext';

const MyOrders = () => {
    const { id } = useParams();
    const {user}=useAuthContext();
    const [orders, setOrders] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        userAxios.get(`/orders/${id}`).then((res) => {
            setOrders(res.data);
        })
    }, [load]);
    return (
        <div>
            <Header />
            <h2 className='font-Volkhov text-4xl font-bold m-10 uppercase text-center'>orders</h2>
            <div className='w-full'>
                {orders.length > 0 ?
                    <div className='mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[80%] mx-auto'>

                        {
                            orders.map((element, i) => (
                                < OrdersCard key={i} data={element} load={load} setLoad={setLoad} type="user" />
                            ))}
                    </div>
                    : <TbNotesOff className='text-9xl mx-auto' />}

            </div>

        </div>
    )
}

export default MyOrders
