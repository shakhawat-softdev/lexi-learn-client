import React from 'react';

const Heading = ({ heading }) => {
   return (
      <div className="text-center">
         <h2 className="text-4xl font-semibold">{heading} </h2>
         <div className="divider w-1/2 mx-auto"></div>
      </div>
   );
};

export default Heading;