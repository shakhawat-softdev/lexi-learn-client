
import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_KEY;

const AddAClass = () => {
   const { user } = useAuth();
   const [axiosSecure] = useAxiosSecure();

   const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`

   const { register, handleSubmit, reset } = useForm();
   const onSubmit = data => {
      // const { className, classImage, instructorName, instructorImage, instructorEmail, status, availableSeats, enrolled, price } = data;
      console.log(data);

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
               const { className, classImage, instructorName, instructorImage, instructorEmail, status, availableSeats, enrolled, price } = data;

               const classData = { className, classImage: imgURL, instructorName, instructorImage: `${user.photoURL}`, instructorEmail, status: "pending", availableSeats: parseFloat(availableSeats), enrolled: 0, price: parseFloat(price), feedBack: "NO" }


               fetch('https://lexi-learn-server-syedarafatcse.vercel.app/classes', {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(classData)//
               })
                  .then(res => res.json())
                  .then(data => {
                     if (data.insertedId) {
                        Swal.fire({ position: 'center', icon: 'success', title: 'Class Added Successfully!', showConfirmButton: false, timer: 1500 })
                        reset()

                     }
                  })

            }

         });

   };

   return (
      <div>
         <div className="text-center">
            <h2 className="text-4xl font-semibold my-4">Add Class</h2>
         </div>


         <div className="m-5 p-5">

            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-3'>

               <div className="form-control  ">
                  <label className="label">
                     <span className="label-text font-semibold">Instructor Name</span>
                  </label>
                  <input type="text" defaultValue={user?.displayName} readOnly className="input input-bordered  "
                     {...register("instructorName", { required: true })}
                  />
               </div>

               <div className="form-control  ">
                  <label className="label">
                     <span className="label-text font-semibold">Instructor Email</span>
                  </label>
                  <input type="text" defaultValue={user?.email} readOnly className="input input-bordered  "
                     {...register("instructorEmail", { required: true })}
                  />
               </div>

               <div className="form-control">
                  <label className="label">
                     <span className="label-text font-semibold">Class Name</span>
                  </label>
                  <input type="text" placeholder="Class Name" className="input input-bordered  "
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
                  <input type="number" placeholder="Available Seats" className="input input-bordered  "
                     {...register("availableSeats", { required: true })}
                  />
               </div>

               <div className="form-control  ">
                  <label className="label">
                     <span className="label-text font-semibold">Price</span>
                  </label>
                  <input type="number" placeholder="Price" className="input input-bordered  "
                     {...register("price", { required: true })}
                  />
               </div>



               {/* 
               <div className="flex">
                  <div className="form-control  ">
                     <label className="label">
                        <span className="label-text font-semibold">Category*</span>
                     </label>
                     <select defaultValue={"pick one"} className="select select-bordered"
                        {...register("category", { required: true })}
                     >
                        <option disabled >Pick one</option>
                        <option>Pizza</option>
                        <option>Soup</option>
                        <option>Salad</option>
                        <option>Drinks</option>
                        <option>Deshi</option>
                        <option>Desert</option>
                     </select>
                  </div> */}

               {/* <div className="form-control  ml-5">
                     <label className="label">
                        <span className="label-text font-semibold">Price*</span>
                     </label>
                     <input type="number" placeholder="Price" className="input input-bordered  "
                        {...register("price", { required: true })}
                     />
                  </div>
               </div> */}

               {/* <div className="form-control">
                  <label className="label">
                     <span className="label-text font-semibold">Recepi Details</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-24" placeholder="Details"
                     {...register("recepi", { required: true })}
                  ></textarea>
               </div> */}

               {/* <div className="form-control  ">
                  <label className="label">
                     <span className="label-text font-semibold">Item Image</span>
                  </label>
                  <input type="file" className="file-input file-input-bordered  "
                     {...register("image", { required: true })}
                  />
               </div> */}

               <input className="btn btn-small mt-4" type="submit" value="Add Item" />
            </form>
         </div>



      </div>
   );
};

export default AddAClass;