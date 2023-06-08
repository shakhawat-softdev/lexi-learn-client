import React from 'react';

const HeroInstructorCard = ({ item }) => {
   const { userName, userEmail, userImage } = item;
   // console.log(item);
   return (
      <div className="card w-96 bg-base-100 shadow-xl">
         <figure className="px-10 pt-10">
            <img src={userImage} />
         </figure>
         <div className="card-body items-center text-center">
            <h2 className="card-title">Name: {userName}</h2>
            <p>Email: {userEmail}</p>
            {/* <div className="card-actions">
               <button className="btn btn-primary">Buy Now</button>
            </div> */}
         </div>
      </div>
   );
};

export default HeroInstructorCard;