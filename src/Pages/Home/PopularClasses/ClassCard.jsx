

const ClassCard = ({ item }) => {

   // console.log(item);
   const { classImage, className, enrolled, availableSeats } = item;
   // console.log(classImage);

   return (
      <div className="card w-96 bg-base-100 shadow-sm border-2 rounded-md border-slate-300 m-2">
         <figure className="px-10 pt-10">
            <img src={classImage} alt="Shoes" className="rounded-m" />
         </figure>
         <div className="card-body items-center text-center">
            <h2 className="card-title">{className}</h2>
         </div>
         {/* <p className="absolute right-0 mt-2 mr-10">Enrolled student:{enrolled} </p> */}
         <button className="btn absolute right-0 mt-2 mr-10">
            Remaing Seats:
            <div className="badge">{availableSeats - enrolled}</div>
         </button>
      </div>
   );
};

export default ClassCard;