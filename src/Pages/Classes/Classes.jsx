import { useEffect, useState } from "react";
import ApprovedClassCard from "./ApprovedClassCard";
import Heading from "../../SharedComponsnts/Heading";


const Classes = () => {
   const [approvedClasses, setapprovedClasses] = useState([])
   useEffect(() => {
      fetch('https://lexi-learn-server-syedarafatcse.vercel.app/classes/approved')
         .then(res => res.json())
         .then(data => {
            // console.log(data);
            setapprovedClasses(data)
         })

   }, [])

   return (
      <div className="my-12">
         <Heading heading={`Available Classes ${approvedClasses.length}`} />
         <div className="grid md:grid-cols-3 w-11/12 mx-auto">
            {approvedClasses?.map(item => <ApprovedClassCard item={item} key={item._id} />)}
         </div>
      </div>
   );
};

export default Classes;