import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import ManageClassTable from "./ManageClassTable";


const ManageClasses = () => {
   const { user } = useAuth();
   const [allClasses, setAllClasses] = useState([])

   const [axiosSecure] = useAxiosSecure();
   useEffect(() => {
      axiosSecure.get('/classes')
         .then(res => {
            console.log(res.data);
            setAllClasses(res.data)
         })
         .catch(error => console.log(error))
   }, [user])

   console.log(allClasses);


   return (
      <div>
         <div className="text-center">
            <h2 className="text-4xl font-semibold my-4">Manage Classes </h2>
         </div>

         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Class Picture</th>
                     <th>Class name</th>
                     <th>Instructor name</th>
                     <th>Instructor email</th>
                     <th>Available seats</th>
                     <th>Price</th>
                     <th className="text-center">Status</th>
                     <th>Send FeedBack</th>
                  </tr>
               </thead>
               <tbody>
                  {/* TABLE ROW */}
                  {allClasses?.map((item, index) => <ManageClassTable item={item} key={item._id} index={index} />)}

               </tbody>
            </table>
         </div>



      </div>
   );
};

export default ManageClasses;