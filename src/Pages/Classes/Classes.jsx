import { useEffect, useState } from "react";
import ApprovedClassCard from "./ApprovedClassCard";


const Classes = () => {
   const [approvedClasses, setapprovedClasses] = useState([])
   useEffect(() => {
      fetch('http://localhost:5000/classes/approved')
         .then(res => res.json())
         .then(data => {
            // console.log(data);
            setapprovedClasses(data)
         })

   }, [])

   return (
      <div>
         <div className="text-center">
            <h2 className="text-4xl font-semibold my-4">All Available Classes {approvedClasses.length} </h2>
         </div>

         <div className="grid grid-cols-3 gap-3">
            {approvedClasses?.map(item => <ApprovedClassCard item={item} key={item._id} />)}
         </div>
      </div>
   );
};

export default Classes;