import { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { authContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const EnrolledClasses = () => {

   const { user, loading } = useContext(authContext)
   // console.log(token);
   const [axiosSecure] = useAxiosSecure();
   const { refetch, data: enrolled = [] } = useQuery({
      queryKey: ['enrolled', user?.email],
      enabled: !loading,
      queryFn: async () => {
         const res = await axiosSecure(`/enrolled?email=${user?.email}`)
         return res.data;
      },
   })
   // console.log("enroll Classes", enrolled)


   return (
      <div>
         <div >
            <div className="text-center">
               <h2 className="text-4xl font-semibold my-4">Total Enrolled Classes: {enrolled?.length} </h2>
            </div>

            <div className="overflow-x-auto">
               <table className="table">
                  {/* head */}
                  <thead>
                     <tr>
                        <th> # </th>
                        <th>Course Name</th>
                        <th>Course Instructor</th>
                        {/* <th>Course Fee</th> */}
                        {/* <th>Remove</th> */}
                     </tr>
                  </thead>
                  <tbody>

                     {enrolled?.map((item, indexm) => <tr key={item._id}>
                        <td> {indexm + 1} </td>
                        <td>{item.className}</td>
                        <td>
                           <div className="flex items-center space-x-3">
                              <div className="avatar">
                                 <div className="mask mask-squircle w-12 h-12">
                                    <img src={item.instructorImage} />
                                 </div>
                              </div>
                              <div>
                                 <div className="font-bold">{item.instructorName}</div>
                              </div>
                           </div>
                        </td>
                        {/* <td>${item.price}</td> */}

                        {/* <td>
                           <button onClick={() => handleDeleteClass(item)} className="btn btn-ghost btn-xs">Delete</button>
                        </td> */}
                     </tr>)}
                  </tbody>
               </table>
            </div>




         </div>
      </div>
   );
};

export default EnrolledClasses;