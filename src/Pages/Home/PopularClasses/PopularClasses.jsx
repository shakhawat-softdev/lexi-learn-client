import { useQuery } from "@tanstack/react-query";
import ClassCard from "./ClassCard";


const PopularClasses = () => {

   const { data: classes = [], refetch } = useQuery(['classes'], async () => {
      const res = await fetch('https://lexi-learn-server.vercel.app/classes')
      return res.json()
   });



   return (
      <div className="mx-auto">
         <div className="text-center my-6">
            <h2 className="text-4xl font-semibold">Popular <span className="text-yellow-500">Classes</span> </h2>
            <div className="divider w-1/2 mx-auto"></div>
         </div>

         <div>
            <div className="md:grid md:grid-cols-3 mx-auto content-center">
               {classes.map(item => <ClassCard item={item} key={item._id} />)}
            </div>
         </div>

      </div>
   );
};

export default PopularClasses;