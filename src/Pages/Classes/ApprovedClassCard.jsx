import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";



const ApprovedClassCard = ({ item }) => {
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';
   const navigate = useNavigate();
   const { user } = useAuth()

   const [isAdmin] = useAdmin();
   const [isInstructor] = useInstructor()

   // console.log("Is admin?", isAdmin);
   // console.log("Is Instructor?", isInstructor);



   const { _id, className, classImage, instructorName, instructorImage, instructorEmail, availableSeats, enrolled, price } = item;

   const handleSelectClass = () => {
      // console.log(user.email);
      const selectClass = { studentEmail: user?.email, classId: _id, className, classImage, price, instructorName, instructorImage, instructorEmail, availableSeats, enrolled }

      if (user && user.email) {
         fetch('https://lexi-learn-server-be5jhux47-syedarafatcse.vercel.app/selectedClass', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(selectClass)

         })
            .then(res => res.json())
            .then(data => {
               console.log(data)
               if (data.insertedId) {
                  Swal.fire({ position: 'center', icon: 'success', title: 'Class is Selected!!', showConfirmButton: false, timer: 1500 });
               }
            })
      }

      else {
         Swal.fire({
            title: 'You are not Login!',
            text: "You have to login firest to select any class!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Login!'
         }).then((result) => {
            if (result.isConfirmed) {

               navigate('/login', { state: { from: location } })
            }
         })

      }
   }

   // console.log(item)
   return (
      <div className="card w-96 glass rounded-sm m-4">
         <figure><img className="w-4/5 mt-5" src={classImage} alt="Instroctor Image" /></figure>
         <div className="card-body space-y-0">
            <h2 className="font-semibold">Course Name: <span className='font-normal'>{className}</span></h2>
            <h2 className="font-semibold">Instructor Name: <span className='font-normal'>{instructorName}</span></h2>
            <h2 className="font-semibold">Available seats:<span className='font-normal'>{availableSeats}</span></h2>
            <h2 className="font-semibold">Price:<span className='font-normal'> ${price}</span></h2>
            <button onClick={() => handleSelectClass()} className="btn btn-success btn-wide btn-sm" disabled={(availableSeats < 0) || isAdmin || isInstructor}>Select</button>
         </div>
      </div>
   );
};

export default ApprovedClassCard;