import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useSelectedCart from '../Hooks/useSelectedCart';
import useAdmin from '../Hooks/useAdmin';
import useInstructor from '../Hooks/useInstructor';
import { ArchiveBoxIcon, CreditCardIcon, DocumentIcon, UsersIcon, UserGroupIcon, HomeModernIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import useStudent from '../Hooks/useStudent';



const Dashbord = () => {
   const [selectedClass, refetch] = useSelectedCart();
   const [isAdmin] = useAdmin();
   const [isInstructor] = useInstructor();
   const [isStudent] = useStudent()
   // console.log("In Dasdbord: is Instructor? ", isInstructor)
   // console.log("In Dashbord: is Admin? ", isAdmin)


   const sharedNavItems =
      <>
         <Link to={'/'}><span className='inline'><HomeModernIcon className="h-5 w-5 inline" /></span>
            <li className='btn content-center'>Home</li>
            {/* <span className='inline'><HomeModernIcon className="h-5 w-5 inline" /></span> */}
         </Link>
         <Link to={'/classes'}><span className='inline'><BuildingOfficeIcon className="h-5 w-5 inline" /></span>
            <li className='btn'>Classes</li>

         </Link>
      </>

   //For Student {selectedClass?.length || 0}
   // const total = selectedClass?.reduce((accumulator, currentPrice) => accumulator + currentPrice.price, 0)

   const studentNavItems =
      <>
         {/* <Link to={'/dashbord/studentHome'}><li className='btn'> My Home</li></Link> */}
         <Link to={'/dashbord/mySelectedClasses'} > <span className='inline'> <ArchiveBoxIcon className="h-5 w-5 inline" /></span>
            <li className='btn inline'>My Selected Classes</li>
         </Link>
         <Link to={'/dashbord/enrolled'}>  <span className='inline'><ArchiveBoxIcon className="h-5 w-5 inline" /></span>
            <li className='btn'> My Enrolled Classes</li>
         </Link>
         {/* <Link to={'/dashbord/payment'}>  <span className='inline'> <CreditCardIcon className="h-5 w-5 inline" /></span>
            <li className='btn'> Payment</li>
         </Link> */}
         <Link to={'/dashbord/paymentsHistory'}> <span className='inline'><DocumentIcon className="h-5 w-5 inline" /></span>
            <li className='btn'>Payment History</li>

         </Link>
      </>
   const instructorNavItems =
      <>
         {/* <Link to={'/dashbord/instructorHome'}><li className='btn'> My Home</li></Link> */}
         <Link to={'/dashbord/addAClass'}> <span className='inline'> <ArchiveBoxIcon className="h-5 w-5 inline" /></span>
            <li className='btn'> Add A Class</li></Link>
         <Link to={'/dashbord/myClasses'}> <span className='inline'><ArchiveBoxIcon className="h-5 w-5 inline" /></span>
            <li className='btn'> My Classes</li></Link>
      </>

   const adminNavItems =
      <>
         {/* <Link to={'/dashbord/adminHome'}><li className='btn'> My Home</li></Link> */}
         <Link to={'/dashbord/manageClasses'}><span className='inline'><UserGroupIcon className="h-5 w-5 inline" /></span>
            <li className='btn'> Manage Classes</li></Link>
         <Link to={'/dashbord/manageUsers'}>
            <span className='inline'><UsersIcon className="h-5 w-5 inline" /></span>
            <li className='btn'> Manage Users</li></Link>
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
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content font-semibold ">
               {isStudent && studentNavItems}
               {isInstructor && instructorNavItems}
               {isAdmin && adminNavItems}

               <div className="divider"></div>

               {/* Share Nav Items */}
               {sharedNavItems}

            </ul>
         </div>
      </div>
   );
};

export default Dashbord;