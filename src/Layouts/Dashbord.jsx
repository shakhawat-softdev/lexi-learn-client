import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashbord = () => {
   const isStudent = true;

   //For all User
   const sharedNavItems =
      <>
         <Link to={'/'}><li><a>Home</a></li></Link>
         <Link to={'/classes'}><li><a>Classes</a></li></Link>
      </>

   //For Student
   const studentNavItems =
      <>
         <Link to={'/dashbord/studentHome'}><li><a> My Home</a></li></Link>
         <Link to={'/dashbord/mySelectedClasses'}><li><a> My Selected Classes</a></li></Link>
         <Link to={'/dashbord/studentHome'}><li><a> My Enrolled Classes</a></li></Link>
         <Link to={'/dashbord/studentHome'}><li><a> Payment</a></li></Link>
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