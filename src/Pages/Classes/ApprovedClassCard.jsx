

const ApprovedClassCard = ({ item }) => {
   const { className, classImage, instructorName, instructorImage, instructorEmail, availableSeats, enrolled, price } = item;

   const isAdmin = false;
   const isInstructor = false;

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
               <button className="btn btn-active btn-secondary" disabled={(availableSeats < 0) || isAdmin || isInstructor}>Select</button>
            </div>
         </div>
      </div>
   );
};

export default ApprovedClassCard;