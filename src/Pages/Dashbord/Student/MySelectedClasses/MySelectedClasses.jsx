import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useSelectedCart from "../../../../Hooks/useSelectedCart";
import { Link } from "react-router-dom";
import Heading from "../../../../SharedComponsnts/Heading";

/* All selected Clss import From DB Collection */
const MySelectedClasses = () => {
   const [selectedClass, refetch] = useSelectedCart()


   /* Delete Secific Class/Course From DB */
   const handleDeleteClass = (item) => {
      Swal.fire({
         title: 'Are you sure?',
      }).then((result) => {

         if (result.isConfirmed) {

            fetch(`http://localhost:5000/selectedClass/${item._id}`, {
               method: 'DELETE',
            })
               .then(res => res.json())
               .then(data => {
                  console.log(data);

                  if (data.deletedCount > 0) {
                     refetch();
                     Swal.fire('Deleted!', 'Course has been deleted.', 'success')
                  }
               })

         }
      })

   };

   const handlePay = (id) => {
      // console.log("Selected Clss-id", id)
      localStorage.setItem("selectedClsID", id)

   }



   return (
      <div className="m-5">

         <Heading heading={`My Selected Classes: ${selectedClass?.length}`} />

         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead>
                  <tr>
                     <th> # </th>
                     <th>Course Name</th>
                     <th>Course Instructor</th>
                     <th>Course Fee</th>
                     <th>Remove</th>
                     <th>Pay</th>
                  </tr>
               </thead>
               <tbody>

                  {selectedClass?.map((item, indexm) => <tr key={item._id}>
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
                     <td>${item.price}</td>
                     <td>
                        <button onClick={() => handleDeleteClass(item)} className="btn btn-error btn-xs">Delete</button>
                     </td>
                     <td>
                        <Link to={`/dashbord/payment/${item._id}`}> <button onClick={() => handlePay(item._id)} className="btn btn-accent btn-xs">Pay</button></Link>
                     </td>
                  </tr>)}
               </tbody>
            </table>
         </div>

      </div>
   );
};

export default MySelectedClasses;