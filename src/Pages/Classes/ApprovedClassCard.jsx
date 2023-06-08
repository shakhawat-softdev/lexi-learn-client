import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";


const ApprovedClassCard = ({ item }) => {
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';
   const navigate = useNavigate();

   const { _id, className, classImage, instructorName, instructorImage, instructorEmail, availableSeats, enrolled, price } = item;

   const isAdmin = false;
   const isInstructor = false;

   const { user } = useAuth()

   const handleSelectClass = () => {
      // console.log(user.email);
      const selectClass = { studentEmail: user?.email, classId: _id, className, classImage, price, instructorName, instructorImage, instructorEmail, availableSeats, enrolled }

      if (user && user.email) {
         fetch('http://localhost:5000/selectedClass', {
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
      <div className="card w-96 glass">
         <figure><img src={instructorImage} alt="car!" /></figure>
         <div className="card-body">
            <h2 className="card-title">Course Name: {className}</h2>
            <h2 className="card-title">Instructor Name: {instructorName}</h2>
            <p>Available seats:{availableSeats}</p>
            <p>Price: ${price}</p>
            <div className="card-actions justify-end">
               <button onClick={() => handleSelectClass()} className="btn btn-active btn-secondary" disabled={(availableSeats < 0) || isAdmin || isInstructor}>Select</button>
            </div>
         </div>
      </div>
   );
};

export default ApprovedClassCard;