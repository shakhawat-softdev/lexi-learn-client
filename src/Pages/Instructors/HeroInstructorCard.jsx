import React from 'react';

const HeroInstructorCard = ({ item }) => {
   const { userName, userEmail, userImage } = item;

   return (
      <div className="card w-96 bg-base-100 border-2 m-5">
         <figure className="px-10 pt-10">
            <img src={userImage} />
         </figure>
         <div className="card-body items-center text-center">
            <h2 className="card-title">Name: {userName}</h2>
            <p>Email: {userEmail}</p>
         </div>
      </div>
   );
};

export default HeroInstructorCard;