import React from 'react';

const HistotyCard = ({ item, index }) => {
   console.log(item)
   const { transectionId, date, totalprice, orderStatus, coureseName } = item;
   console.log(item)

   return (

      <div className="card w-96 bg-slate-50 border-2 rounded-md m-5 p-3">
         <div className="card-body">
            <h2 className="card-title">Invoice NO: {index + 1}</h2>
            <h2 className='font-bold'>Date: <span className='font-normal'>{date}</span> </h2>
            <h2 className='font-bold'>TransecTion Id: <span className='font-normal'>{transectionId}</span> </h2>
            <h2 className='font-bold'>Total Payment: <span className='font-normal'> ${totalprice}</span> </h2>
            <h2 className='font-bold'>Enrolled Corses: <span className='font-normal'>
               {coureseName}
            </span> </h2>

            <h2 className='font-bold'>Order Statue: <span className='font-normal'> {orderStatus}</span> </h2>

         </div>
      </div>

   );
};

export default HistotyCard;