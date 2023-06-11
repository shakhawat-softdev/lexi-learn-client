import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useInstructor = () => {
   const { user, loading } = useAuth();
   // console.log("Hook user", user.email)

   const [axiosSecure] = useAxiosSecure()
   const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
      queryKey: ['isInstructor', user?.email],
      enabled: !loading,
      queryFn: async () => {
         const res = await axiosSecure.get(`/users/instructor/${user?.email}`)

         return res.data.instructor;
      }
   })
   // console.log("In useInstroctor Hook: is Instructor? ", isInstructor);


   return [isInstructor, isInstructorLoading];
};

export default useInstructor;