import { useEffect, useState } from "react";
import HeroInstructorCard from "./HeroInstructorCard";


const Instructors = () => {

   const [instructos, setInstructors] = useState([])
   useEffect(() => {
      fetch('http://localhost:5000/users/instructor')
         .then(res => res.json())
         .then(data => {
            console.log(data);
            setInstructors(data)
         })

   }, [])

   return (
      <div>
         <div className="text-center">
            <h2 className="text-4xl font-semibold my-4">Our Instructors </h2>
         </div>
         <div className="grid grid-cols-3 gap-2">
            {instructos.map(item => <HeroInstructorCard item={item} key={item._id} />)}
         </div>

      </div>
   );
};

export default Instructors;