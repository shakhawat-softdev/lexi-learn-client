
import Swal from 'sweetalert2';

const ManageUsersTable = ({ item, index }) => {
   // console.log(item)

   const { _id, userName, userEmail, userImage, role, } = item;

   const handleMakeAdmin = id => {
      console.log("ID", id);

      fetch(`https://lexi-learn-server-be5jhux47-syedarafatcse.vercel.app/users/${id}`, {
         method: 'PATCH',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({ role: 'admin' })

      })
         .then(res => res.json())
         .then(data => {
            console.log(data)
            if (data.modifiedCount > 0) {
               Swal.fire({ position: 'center', icon: 'success', title: 'Action Successful!', showConfirmButton: false, timer: 1500 })
            }
         })
   };


   const handleMakeIntructor = id => {
      console.log("ID", id);

      fetch(`https://lexi-learn-server-be5jhux47-syedarafatcse.vercel.app/users/${id}`, {
         method: 'PATCH',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({ role: 'instructor' })

      })
         .then(res => res.json())
         .then(data => {
            console.log(data)
            if (data.modifiedCount > 0) {
               Swal.fire({ position: 'center', icon: 'success', title: 'Action Successful!', showConfirmButton: false, timer: 1500 })
            }
         })

   };




   return (
      <>
         <tr>
            <td> {index + 1} </td>
            <td>
               <div className="flex items-center space-x-3">
                  <div className="avatar">
                     <div className="mask mask-squircle w-12 h-12">
                        <img src={userImage} alt="Avatar Tailwind CSS Component" />
                     </div>
                  </div>
               </div>
            </td>
            <td> {userName} </td>
            <td>{userEmail}</td>
            <td className="flex flex-row justify-center items-center gap-1 text-center content-center m-auto">

               <button onClick={() => handleMakeAdmin(_id)} className="btn btn-accent btn-xs" disabled={(role == "admin")}>Make Admin</button>

               <button onClick={() => handleMakeIntructor(_id)} className="btn btn-success btn-xs" disabled={(role == "instructor")} > Make Instructor </button>

            </td>

         </tr >

      </>
   );
};

export default ManageUsersTable;