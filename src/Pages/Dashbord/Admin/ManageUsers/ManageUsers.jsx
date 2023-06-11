import React, { useEffect, useState } from 'react';
import ManageClassTable from '../ManageClasses/ManageClassTable';
import ManageUsersTable from './ManageUsersTable';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import Heading from '../../../../SharedComponsnts/Heading';

const ManageUsers = () => {

   const { user } = useAuth();
   const [allUsers, setAllUsers] = useState([])

   const [axiosSecure] = useAxiosSecure();
   useEffect(() => {
      axiosSecure.get('/users')
         .then(res => {
            // console.log(res.data);
            setAllUsers(res.data)
         })
         .catch(error => console.log(error))
   }, [user])

   // console.log(allUsers);





   return (
      <div className='m-5'>

         <Heading heading={"Manage Users"} />

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