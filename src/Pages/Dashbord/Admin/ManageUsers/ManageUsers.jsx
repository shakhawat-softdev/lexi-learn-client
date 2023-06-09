import React, { useEffect, useState } from 'react';
import ManageClassTable from '../ManageClasses/ManageClassTable';
import ManageUsersTable from './ManageUsersTable';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';

const ManageUsers = () => {

   const { user } = useAuth();
   const [allUsers, setAllUsers] = useState([])

   const [axiosSecure] = useAxiosSecure();
   useEffect(() => {
      axiosSecure.get('/users')
         .then(res => {
            console.log(res.data);
            setAllUsers(res.data)
         })
         .catch(error => console.log(error))
   }, [user])

   console.log(allUsers);





   return (
      <div>
         <div className="text-center">
            <h2 className="text-4xl font-semibold my-4">Manage Users </h2>
         </div>


         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead>
                  <tr>
                     <th>#</th>
                     <th>User Image</th>
                     <th>User name</th>
                     <th>User email</th>
                     {/* <th>Instructor email</th> */}
                     {/* <th>Available seats</th> */}
                     {/* <th>Price</th> */}
                     <th className="text-center">Make As</th>
                     {/* <th>Send FeedBack</th> */}
                  </tr>
               </thead>
               <tbody>
                  {/* TABLE ROW */}
                  {allUsers?.map((item, index) => <ManageUsersTable item={item} key={item._id} index={index} />)}

               </tbody>
            </table>
         </div>




      </div>
   );
};

export default ManageUsers;