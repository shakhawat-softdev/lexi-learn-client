import { useQuery } from "@tanstack/react-query";
import InstructorCard from "./InstructorCard";

const PopularInstuctors = () => {
   const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
      const res = await fetch('https://lexi-learn-server.vercel.app/instructors')
      return res.json()
   });


   return (
      <div className="mx-auto">
         <div className="text-center my-6">
            <h2 className="text-4xl font-semibold">Popular <span className="text-yellow-500">Instructors </span> </h2>
            <div className="divider w-1/2 mx-auto"></div>
         </div>

         <div className="md:grid md:grid-cols-3 mx-auto content-center">
            {instructors.map(item => <InstructorCard item={item} key={item._id} />)}
         </div>
      </div>
   );
};

export default PopularInstuctors;