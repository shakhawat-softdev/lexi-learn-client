import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import logo1 from '../../../assets/images/logos/logo1.jpg'
import useAdmin from "../../../Hooks/useAdmin";
import useInstructor from "../../../Hooks/useInstructor";
import useStudent from "../../../Hooks/useStudent";


const Navbar = () => {
   const { user, logout } = useAuth()
   const [isAdmin] = useAdmin();
   const [isInstructor] = useInstructor()
   const [isStudent] = useStudent();
   // console.log("In Navbar: is Instructor? ", isInstructor);
   // console.log("In Navbar: is Admin? ", isAdmin);
   console.log("In Navbar: is Student? ", isStudent);

   const handleLogout = () => {
      logout()
         .then(result => { })
         .catch()
   };

   const loginLogout =
      <ul className="menu menu-horizontal px-1  font-semibold text-lg">
         {user ?
            <Link onClick={handleLogout}><li><span>Logout</span></li></Link> :
            <Link to='/login'><li><span>Login</span></li></Link>
         }
      </ul>

   const navItems = <ul className="menu menu-horizontal font-semibold px-1 text-lg">
      <Link to='/'><li><span>Home</span></li></Link>
      <Link to='/instructors'><li><span>Instructors</span></li></Link>
      <Link to='/classes'><li><span>Classes</span></li></Link>

      {user && <>
         {isAdmin && <Link to='/dashbord/manageClasses'><li><span>Dashboard</span></li></Link>}
         {isInstructor && <Link to='/dashbord/addAClass'><li><span>Dashboard</span></li></Link>}
         {isStudent && <Link to='/dashbord/mySelectedClasses'><li><span>Dashboard</span></li></Link>}
      </>}




   </ul>

   const navItemsDropdown = <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <Link to='/'><li><span>Home</span></li></Link>
      <Link to='/instructors'><li><span>Instructors</span></li></Link>
      <Link to='/classes'><li><span>Classes</span></li></Link>

      {user && <>
         {isAdmin && <Link to='/dashbord/manageClasses'><li><span>Dashboard</span></li></Link>}
         {isInstructor && <Link to='/dashbord/addAClass'><li><span>Dashboard</span></li></Link>}
         {isStudent && <Link to='/dashbord/mySelectedClasses'><li><span>Dashboard</span></li></Link>}
      </>}

   </ul>


   return (
      <>
         <div className="navbar bg-slate-100 p-5 h-[80px]">
            <div className="navbar-start">
               <div className="dropdown">
                  <label tabIndex={0} className="btn btn-ghost lg:hidden">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                  </label>
                  {navItemsDropdown}
               </div>

               <div className=" invisible lg:visible">
                  <img className="h-16 rounded-lg" src={logo1} alt="" />
               </div>

            </div>

            <div className="navbar-center hidden lg:flex">
               {navItems}
            </div>

            <div className="navbar-end">
               {loginLogout}
               {user &&
                  <div className="dropdown dropdown-end">
                     <div className="btn btn-ghost btn-circle avatar tooltip tooltip-left tooltip-info" data-tip={`${user && user?.displayName}`}>
                        <div className="w-10 rounded-full">
                           <img src={user && user?.photoURL} />
                        </div>
                     </div>
                  </div>}
            </div>
         </div>
      </>
   );
};

export default Navbar;