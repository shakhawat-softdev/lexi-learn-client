import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { BeakerIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'



const Login = () => {
   const [message, setMessage] = useState('');
   const { loginWithEmailAndPass, loginWithGoogle } = useAuth();
   const { register, handleSubmit, reset, formState: { errors } } = useForm();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';
   const navigate = useNavigate();

   const [isVisible, setVisible] = useState(true);
   const handleVisible = () => {
      setVisible(!isVisible);
   };


   const onSubmit = data => {
      const { email, password } = data;
      console.log(data)
      loginWithEmailAndPass(email, password)
         .then(resut => {
            const loggedUser = resut.user;
            console.log(loggedUser);
            navigate(from);
            setMessage('Login successful!');
            setMessage('');
         })
         .catch(error => {
            setMessage(error.message)
            console.error(error.message)
         })
   };

   const handleGoogleLogin = () => {
      loginWithGoogle()
         .then(result => {
            const loggedUser = result.user;
            // console.log(loggedUser);

            const userInfo = { userName: loggedUser.displayName, userEmail: loggedUser.email, userImage: loggedUser?.photoURL, role: 'student' };
            fetch('http://localhost:5000/users', {
               method: 'POST',
               headers: { 'content-type': 'application/json' },
               body: JSON.stringify(userInfo)//
            })
               .then(res => res.json())
               .then(data => {
                  // console.log(data.insertedId);

                  if (data.insertedId) {
                     Swal.fire({ position: 'center', icon: 'success', title: 'Login Successful!!', showConfirmButton: false, timer: 1500 });
                     navigate(from, { replace: true });
                  }

                  navigate(from, { replace: true });
               })
         })
         .catch(error => {
            console.log(error.message);
         })
   };


   return (
      <>
         <h1 className="text-3xl font-bold my-3 ml-4 text-center">Login now!</h1>
         <div className='flex justify-center items-center text-center mb-5'>
            <section className="card flex-shrink-0 w-96 max-w-sm hadow-md border border-sky-300 bg-base-100 ">
               <div className='card-body'>

                  <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Email</span>
                        </label>
                        <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-500d">Email is required</span>}
                     </div>
                     {/* <EyeIcon className="h-6 w-6 text-blue-500" /> */}
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Password </span>
                        </label>
                        <input type={isVisible ? "password" : "text"}   {...register("password", { required: true, })} placeholder="required" className="input input-bordered relative" />

                        {isVisible ? <EyeIcon onClick={handleVisible} className="h-6 w-6 text-blue-500 absolute right-0 mt-12 mr-20" /> : <EyeSlashIcon onClick={handleVisible} className="h-6 w-6 text-blue-500 absolute right-0 mt-12 mr-20" />}

                        <label className="label">
                           <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                     </div>


                     <div className="form-control mt-6">
                        {message && <h2 className="text-red-600">{message}</h2>}
                        <input className="btn btn-primary" type="submit" value="Login" />
                     </div>
                  </form>

                  <div className="divider">OR</div>

                  <button className="btn btn-active btn-success" onClick={handleGoogleLogin}> <FcGoogle className='text-3xl mr-2' /> Login with Google</button>

                  <label className="label">
                     <p className='label-text-alt'>Have not account? Please <Link to='/register'><span className="label-text-alt link link-hover">register</span></Link>
                     </p>
                  </label>
               </div>

            </section>

         </div>



      </>
   );
};

export default Login;