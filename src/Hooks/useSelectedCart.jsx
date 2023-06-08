import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { authContext } from '../Provider/AuthProvider';

const useSelectedCart = () => {

   const { user, loading } = useContext(authContext)
   // console.log(token);
   const [axiosSecure] = useAxiosSecure();
   const { refetch, data: selectedClass = [] } = useQuery({
      queryKey: ['selectedClass', user?.email],
      enabled: !loading,
      queryFn: async () => {
         const res = await axiosSecure(`/selectedClass?email=${user?.email}`)
         return res.data;
      },

   })

   // console.log("Result", selectedClass)

   return [selectedClass, refetch]
}

export default useSelectedCart;
