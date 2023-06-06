import { Link } from "react-router-dom";


const ErrorPage = () => {
   return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
         <div className="max-w-md bg-white border border-gray-300 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-6">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
               >
                  <path
                     fillRule="evenodd"
                     d="M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm.5-9h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"
                     clipRule="evenodd"
                  />
               </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
               Oops! Something went wrong.
            </h2>
            <p className="text-gray-600 mb-4">
               We apologize for the inconvenience. Please try again later.
            </p>
            <Link to={'/'}>   <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
               Go back to homepage
            </button></Link>
         </div>
      </div>
   );
};

export default ErrorPage;
