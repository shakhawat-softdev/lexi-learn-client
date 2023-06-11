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
               <h2 className='font-semibold'>Intructor Name: <span className='font-normal'>{instructorName}</span> </h2>
               <h2 className='font-semibold'>Availabale Seats: <span className='font-normal'>{availableSeats}</span> </h2>
               <h2 className='font-semibold'>Price: <span className='font-normal'>${price}</span> </h2>
               <h2 className='font-semibold'>Status: <span className='font-normal text-red-600'>{status}</span> </h2>
               {/* {feedBack && <h2 className='font-semibold'>Feedback: <span className='font-normal'>{feedBack}</span> </h2>} */}

               <div className="card-actions justify-end">
                  <div className="btn btn-xs badge badge-outline">Update</div>
               </div>
            </div>
         </div>

      </div>
   );
};

export default MyClassCard;