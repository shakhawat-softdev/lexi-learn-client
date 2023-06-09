
import Swal from 'sweetalert2';

const ManageClassTable = ({ item, index }) => {
   const { _id, className, classImage, instructorName, instructorImage, instructorEmail, status, availableSeats, enrolled, price, feedBack } = item;

   const handleApprove = id => {
      console.log("ID", id);

      fetch(`http://localhost:5000/classes/${id}`, {
         method: 'PATCH',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({ status: 'approved' })

      })
         .then(res => res.json())
         .then(data => {
            console.log(data)
            if (data.modifiedCount > 0) {
               Swal.fire({ position: 'center', icon: 'success', title: 'Action Successful!', showConfirmButton: false, timer: 1500 })
            }
         })

   };

   const handleDenei = id => {
      console.log("ID", id);

      fetch(`http://localhost:5000/classes/${id}`, {
         method: 'PATCH',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({ status: 'denied' })

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
      <tr>
         <td> {index + 1} </td>
         <td>
            <div className="flex items-center space-x-3">
               <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                     <img src={classImage} alt="Avatar Tailwind CSS Component" />
                  </div>
               </div>
            </div>
         </td>
         <td> {className} </td>
         <td>{instructorName}</td>
         <td>{instructorEmail}</td>
         <td className='text-center'>{availableSeats}</td>
         <td>${price}</td>
         <td className="flex flex-row justify-center items-center gap-1 text-center content-center m-auto">
            <button className="btn btn-accent btn-xs">{status}</button>

            <button onClick={() => handleApprove(_id)} className="btn btn-success btn-xs" disabled={(status == 'approved') || (status == 'denied')} >Approve</button>

            <button onClick={() => handleDenei(_id)} className="btn btn-error btn-xs" disabled={(status == 'approved') || (status == 'denied')} >Denei</button>
         </td>
         <th> <button className="btn  btn-xs">Feed back</button> </th>
      </tr>
   );
};

export default ManageClassTable;