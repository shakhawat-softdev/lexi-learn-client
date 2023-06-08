
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import Dashbord from "../Layouts/Dashbord";
import StudentHome from "../Pages/Dashbord/Student/StudentHome/StudentHome";
import MySelectedClasses from "../Pages/Dashbord/Student/MySelectedClasses/MySelectedClasses";
import Payment from "../Pages/Payment/Payment";
import EnrolledClasses from "../Pages/EnrolledClasses/EnrolledClasses";
import PaymentsHistory from "../Pages/PaymentsHistory/PaymentsHistory";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
         {
            path: '/',
            element: <Home />
         },
         {
            path: '/login',
            element: <Login />
         },
         {
            path: '/register',
            element: <Register />
         },
         {
            path: '/instructors',
            element: <Instructors />
         },
         {
            path: '/classes',
            element: <Classes />
         }
      ]
   },
   {
      path: 'dashbord',
      element: <Dashbord />,
      children: [
         {
            path: 'studentHome',
            element: <StudentHome />
         },
         {
            path: 'mySelectedClasses',
            element: <MySelectedClasses />
         },
         {
            path: 'payment',
            element: <Payment />
         },
         {
            path: 'enrolled',
            element: <EnrolledClasses />
         },
         {

            path: 'paymentsHistory',
            element: <PaymentsHistory />
         }

      ]
   }
]);
