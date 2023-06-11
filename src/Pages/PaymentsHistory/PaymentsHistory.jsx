import React, { useContext } from 'react';
import { authContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import HistotyCard from './HistotyCard';
import Heading from '../../SharedComponsnts/Heading';

const PaymentsHistory = () => {
   const { user, loading } = useContext(authContext)
   // console.log(token);
   const [axiosSecure] = useAxiosSecure();
   const { refetch, data: paymentHistory = [] } = useQuery({
      queryKey: ['paymentHistory', user?.email],
      enabled: !loading,
      queryFn: async () => {
         const res = await axiosSecure(`/paymentHistory?email=${user?.email}`)
         return res.data;
      },
   })




   return (
      <div className='m-5'>
         <Heading heading={"Payment History"} />
         <div className='grid grid-cols-2 gap-5 m-3'>

            {paymentHistory.map((item, index) => <HistotyCard item={item} index={index} key={item._id} />)}

         </div>
      </div>
   );
};

export default PaymentsHistory;