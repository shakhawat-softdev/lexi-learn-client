import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useSelectedCart from "../../../../Hooks/useSelectedCart";

//All selected Clss import From DB Collection
const MySelectedClasses = () => {
   const [selectedClass, refetch] = useSelectedCart()
   // console.log("All selected Class", selectedClass)




   //Delete Secific Class/Course From DB

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

   }





   const total = selectedClass.reduce((accumulator, currentPrice) => accumulator + currentPrice.price, 0)
   // console.log(total);
   return (
      <div>
         <div className="text-center">
            <h2 className="text-4xl font-semibold my-4">My Selected Classes: {selectedClass?.length} </h2>
         </div>
         <div className="text-end">
            <button className="btn btn-wide btn-active">Pay ${total}</button>
         </div>

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
                        <button onClick={() => handleDeleteClass(item)} className="btn btn-ghost btn-xs">Delete</button>
                     </td>
                  </tr>)}
               </tbody>
            </table>
         </div>

      </div>
   );
};

export default MySelectedClasses;