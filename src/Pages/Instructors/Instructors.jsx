import { useEffect, useState } from "react";
import HeroInstructorCard from "./HeroInstructorCard";
import Heading from "../../SharedComponsnts/Heading";
import { motion } from 'framer-motion';


const Instructors = () => {

   const [instructos, setInstructors] = useState([]);
   useEffect(() => {
      fetch('http://localhost:5000/users/instructor')
         .then(res => res.json())
         .then(data => {
            setInstructors(data)
         });
   }, [])

   return (
      <div>
         <div className="my-5">
            <Heading heading={"Our Available Intructors"} />
         </div>

         <div className="grid md:grid-cols-3">
            {instructos.map(item => <HeroInstructorCard item={item} key={item._id} />)}
         </div>

      </div>
   );
};

export default Instructors;