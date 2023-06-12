import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import Heading from "../../../../SharedComponsnts/Heading";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
const UpdateAClass = () => {
   const updateClsID = useParams();
   // console.log("id", updateClsID.id);


   const { user } = useAuth()
   const [myClasses, setMyClasses] = useState([]);

   const url = `https://lexi-learn-server-be5jhux47-syedarafatcse.vercel.app/myClasses?email=${user?.email}`;
   useEffect(() => {
      fetch(url)
         .then(res => res.json())
         .then(data => setMyClasses(data))
   }, [user]);

   const updateClass = myClasses?.find(cls => cls._id === updateClsID?.id);
   // console.log("selected cls", updateClass)




   const [axiosSecure] = useAxiosSecure();
   const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
   const { register, handleSubmit, reset } = useForm();

   const onSubmit = data => {

      // console.log(data);

      const formData = new FormData();
      formData.append('image', data.classImage[0])
      fetch(image_hosting_url, {
         method: 'POST',
         body: formData
      })
         .then(res => res.json())
         .then(imgResponse => {
            console.log(imgResponse);
            if (imgResponse.success) {
               const imgURL = imgResponse.data.url;

               const { className, availableSeats, price } = data;
               console.log("Form data", data);

               const UPdatedData = { className, classImage: imgURL, instructorName: `${user?.displayName}`, instructorImage: `${user.photoURL}`, instructorEmail: `${user?.email}`, status: "pending", availableSeats: parseFloat(availableSeats), enrolled: 0, price: parseFloat(price), feedBack: "NO" }

               console.log('UPADTE DATA', UPdatedData)

               fetch(`https://lexi-learn-server-be5jhux47-syedarafatcse.vercel.app/updateClass/${updateClsID?.id}`, {
                  method: 'PATCH',
                  headers: {
                     'content-type': 'application/json'
                  },
                  body: JSON.stringify(UPdatedData)

               })
                  .then(res => res.json())
                  .then(data => {
                     console.log(data)
                     if (data.modifiedCount > 0) {
                        //update state
                        Swal.fire({ position: 'center', icon: 'success', title: 'Class Updated Successfully!', showConfirmButton: false, timer: 1500 })
                     }
                  })


            }

         });

   };




   return (
      <div className="m-5">
         <Heading heading={"Upadte Your Class"} />

         <div className="m-5 p-5 border-2 border-cyan-600">
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-3'>
               <div className="form-control">
                  <label className="label">
                     <span className="label-text font-semibold">Class Name</span>
                  </label>
                  <input type="text" defaultValue={updateClass?.className} placeholder="Class Name" className="input input-bordered  "
                     {...register("className", { required: true })}
                  />
               </div>

               <div className="form-control">
                  <label className="label">
                     <span className="label-text font-semibold">Class Image</span>
                  </label>
                  <input type="file" className="file-input file-input-bordered"
                     {...register("classImage", { required: true })}
                  />
               </div>

               <div className="form-control  ">
                  <label className="label">
                     <span className="label-text font-semibold">Available Seats</span>
                  </label>
                  <input type="number" defaultValue={updateClass?.availableSeats} placeholder="Available Seats" className="input input-bordered  "
                     {...register("availableSeats", { required: true })}
                  />
               </div>

               <div className="form-control  ">
                  <label className="label">
                     <span className="label-text font-semibold">Price</span>
                  </label>
                  <input type="number" defaultValue={updateClass?.price} placeholder="Price" className="input input-bordered  "
                     {...register("price", { required: true })}
                  />
               </div>

               <input className="btn btn-small mt-4" type="submit" value="Add Item" />
            </form>
         </div>




      </div>
   );
};

export default UpdateAClass;