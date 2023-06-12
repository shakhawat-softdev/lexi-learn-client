import React from 'react';


const InstructorCard = ({ item }) => {
   const { instructorImage, instructorName, enrolled } = item;

   return (
      <div className="card glass w-80 md:w-96 bg-base-100 shadow-xl m-1 mx-auto ">
         <figure className="px-10 pt-10">
            <img src={instructorImage} alt="Shoes" className="rounded-xl" />
         </figure>
         <div className="card-body items-center text-center">
            <h2 className="card-title">{instructorName}</h2>
         </div>
         <button className="btn bg-sky-300 absolute right-0 mt-2 mr-10">
            Enrolled:
            <div className="badge">{enrolled}</div>
         </button>
      </div>
   );
};

export default InstructorCard;




