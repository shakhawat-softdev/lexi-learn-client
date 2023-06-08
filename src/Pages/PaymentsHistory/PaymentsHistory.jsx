import React, { useContext } from 'react';
import { authContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import HistotyCard from './HistotyCard';

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
      <div>
         <div className="text-center">
            <h2 className="text-4xl font-semibold my-4">Payment History: {paymentHistory?.length}</h2>
         </div>
         <div className='flex gap-5'>
            {paymentHistory.map((item, index) => <HistotyCard item={item} index={index} key={item._id} />)}
         </div>
      </div>
   );
};

export default PaymentsHistory;