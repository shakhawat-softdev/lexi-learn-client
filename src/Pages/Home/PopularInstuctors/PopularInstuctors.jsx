import { useQuery } from "@tanstack/react-query";
import InstructorCard from "./InstructorCard";

const PopularInstuctors = () => {
   const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
      const res = await fetch('http://localhost:5000/classes')
      return res.json()
   })


   return (
      <div>
         <div className="text-center my-6">
            <h2 className="text-4xl font-semibold">Popular <span className="text-yellow-500">Instructors </span> </h2>

            <div className="grid grid-cols-3">
               {instructors.map(item => <InstructorCard item={item} key={item._id} />)}
            </div>
         </div>
      </div>
   );
};

export default PopularInstuctors;