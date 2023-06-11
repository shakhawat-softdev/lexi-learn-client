import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useStudent = () => {
   const { user, loading } = useAuth();
   // console.log("Hook user", user.email)

   const [axiosSecure] = useAxiosSecure()
   const { data: isStudent, isLoading: isStudentLoading } = useQuery({
      queryKey: ['isStudent', user?.email],
      enabled: !loading,
      queryFn: async () => {
         const res = await axiosSecure.get(`/users/student/${user?.email}`)

         return res.data.student;
      }
   })
   // console.log("In useStudent Hook: is isStudent? ", isStudent);


   return [isStudent, isStudentLoading];
};

export default useStudent;