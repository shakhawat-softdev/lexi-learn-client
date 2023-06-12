
import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Heading from '../../../../SharedComponsnts/Heading';

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

               const classData = { className, classImage: imgURL, instructorName, instructorImage: `${user.photoURL}`, instructorEmail, status: "pending", availableSeats: parseFloat(availableSeats), enrolled: 0, price: parseFloat(price), feedBack: "NO FEEDBACK" }


               fetch('https://lexi-learn-server-be5jhux47-syedarafatcse.vercel.app/classes', {
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
      <div className='m-5'>

         <Heading heading={"Add A Class"} />


         <div className="m-5 p-5 border-2 border-rose-400">
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

               <input className="btn btn-small mt-4" type="submit" value="Add Item" />
            </form>
         </div>

      </div>
   );
};

export default AddAClass;