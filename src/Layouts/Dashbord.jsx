import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useSelectedCart from '../Hooks/useSelectedCart';

const Dashbord = () => {
   const [selectedClass, refetch] = useSelectedCart()

   const isStudent = true;
   //For all User
   const sharedNavItems =
      <>
         <Link to={'/'}><li className='btn'>Home</li></Link>
         <Link to={'/classes'}><li className='btn'>Classes</li></Link>
      </>

   //For Student
   // const total = selectedClass?.reduce((accumulator, currentPrice) => accumulator + currentPrice.price, 0)
   const studentNavItems =
      <>
         <Link to={'/dashbord/studentHome'}><li className='btn'> My Home</li></Link>
         <Link to={'/dashbord/mySelectedClasses'}><li className='btn'> My Selected Classes {selectedClass?.length || 0}</li></Link>
         <Link to={'/dashbord/enrolled'}><li className='btn'> My Enrolled Classes</li></Link>
         <Link to={'/dashbord/payment'}><li className='btn'> Payment</li></Link>
         <Link to={'/dashbord/paymentsHistory'}><li className='btn'>Payment History</li></Link>
      </>


   return (
      <div className="drawer lg:drawer-open">
         <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
         <div className="drawer-content">
            {/* Page content here */}
            <Outlet />
         </div>

         <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            {/* Sidebar content here */}
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content font-semibold">
               {isStudent && studentNavItems}
               <div className="divider"></div>
               {sharedNavItems}
            </ul>
         </div>
      </div>
   );
};

export default Dashbord;