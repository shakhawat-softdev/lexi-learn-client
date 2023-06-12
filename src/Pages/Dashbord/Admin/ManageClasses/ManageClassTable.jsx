
import Swal from 'sweetalert2';
import useSelectedCart from '../../../../Hooks/useSelectedCart';

const ManageClassTable = ({ item, index }) => {
   const { _id, className, classImage, instructorName, instructorEmail, status, availableSeats, price } = item;
   const [selectedClass, refetch] = useSelectedCart();

   const handleApprove = id => {


      fetch(`https://lexi-learn-server-be5jhux47-syedarafatcse.vercel.app/classes/${id}`, {
         method: 'PATCH',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({ status: 'approved' })

      })
         .then(res => res.json())
         .then(data => {

            // console.log(data)
            if (data.modifiedCount > 0) {
               refetch();
               Swal.fire({ position: 'center', icon: 'success', title: 'Action Successful!', showConfirmButton: false, timer: 1500 })
            }
         })

   };

   const handleDenei = id => {
      fetch(`https://lexi-learn-server-be5jhux47-syedarafatcse.vercel.app/classes/${id}`, {
         method: 'PATCH',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({ status: 'denied' })

      })
         .then(res => res.json())
         .then(data => {
            // console.log(data)
            if (data.modifiedCount > 0) {
               refetch();
               Swal.fire({ position: 'center', icon: 'success', title: 'Action Successful!', showConfirmButton: false, timer: 1500 })
            }
         });
      // console.log("classId", id);
   };


   const handlaeFeedback = (event) => {
      event.preventDefault();
      const form = event.target;
      const adminFeedback = form.feedback.value;

      fetch(`https://lexi-learn-server-be5jhux47-syedarafatcse.vercel.app/classes/${_id}`, {
         method: 'PATCH',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({ feedBack: adminFeedback })

      })
         .then(res => res.json())
         .then(data => {
            // console.log(data)
            if (data.modifiedCount > 0) {
               Swal.fire({ position: 'center', icon: 'success', title: 'Feedback Successful!', showConfirmButton: false, timer: 1500 })
            }
         })

      document.getElementById("create-course-form").reset();
   }


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
         <th>
            {/* <button className="btn  btn-xs">Feed back</button> */}
            <label htmlFor="my_modal_6" className="btn  btn-xs ">Feed back</label>
         </th>


         {/* The button to open modal */}
         {/* <label htmlFor="my_modal_6" className="btn">open modal</label> */}

         {/* Put this part before </body> tag */}
         <input type="checkbox" id="my_modal_6" className="modal-toggle" />

         <div className="modal">
            <div className="modal-box">
               <h3 className="font-bold text-lg">Feedback</h3>

               <form onSubmit={handlaeFeedback} id="create-course-form">

                  <div className="form-control">
                     <textarea name='feedback' className="textarea textarea-bordered h-24" placeholder="Write Feedback"></textarea>
                  </div>

                  <input className="btn btn-accent btn-sm" type="submit" value="Submit" />
               </form>
               <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn btn-secondary btn-sm">Close</label>
               </div>

            </div>
         </div>




      </tr>
   );
};

export default ManageClassTable;