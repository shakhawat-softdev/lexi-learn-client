import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { Ring } from 'react-spinners-css';


const PrivateRoute = ({ children }) => {
   const { user, loding } = useContext(AuthContext);
   const location = useLocation();


   if (loding) {
      return <p className='text-center my-20'><Ring /></p>
   }
   if (user) {
      return children;
   }

   else {
      return <Navigate to='/login' state={{ from: location }} replace  ></Navigate>
   }

};

export default PrivateRoute;