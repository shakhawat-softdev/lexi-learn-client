import React from 'react';

const MyClassCard = ({ item }) => {
   const { className, classImage, instructorName, instructorImage, instructorEmail, status, availableSeats, enrolled, price, feedBack } = item;
   return (
      <div>
         <div className="card w-72 bg-base-100 rounded-md border-2 ">
            <figure><img src={classImage} alt="Shoes" /></figure>
            {/* <figure><img src={instructorImage} alt="Shoes" /></figure> */}
            <div className="card-body">
               <h2 className="card-title"> Class Name: {className} </h2>
               <h2>Intructor Name: <span>{instructorName}</span> </h2>
               <h2>Availabale Seats: <span>{availableSeats}</span> </h2>
               <h2>Price: <span>${price}</span> </h2>
               <h2>Status: <span>{status}</span> </h2>

               <div className="card-actions justify-end">
                  <div className="badge badge-outline">Update</div>
               </div>
            </div>
         </div>

      </div>
   );
};

export default MyClassCard;