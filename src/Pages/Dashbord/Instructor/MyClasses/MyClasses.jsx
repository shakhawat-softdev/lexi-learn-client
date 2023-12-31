import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import MyClassCard from "./MyClassCard";
import Heading from "../../../../SharedComponsnts/Heading";


const MyClasses = () => {
   const [axiosSecure] = useAxiosSecure();
   const { user } = useAuth()
   const [myClasses, setMyClasses] = useState([])

   const url = `https://lexi-learn-server.vercel.app/myClasses?email=${user?.email}`;
   useEffect(() => {
      fetch(url)
         .then(res => res.json())
         .then(data => setMyClasses(data))
   }, [user])

   // console.log(myClasses)




   return (
      <div className="m-5">
         <Heading heading={`My Class: ${myClasses.length}`} />

         <div className="grid grid-cols-3">
            {myClasses?.map(item => <MyClassCard item={item} key={item._id} />)}
         </div>

      </div>
   );
};

export default MyClasses;