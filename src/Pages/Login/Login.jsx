import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";



const Login = () => {

   const [message, setMessage] = useState('');
   const { loginWithEmailAndPass, loginWithGoogle } = useAuth();
   const { register, handleSubmit, reset, formState: { errors } } = useForm();

   const onSubmit = data => {
      const { email, password } = data;
      console.log(data)
      loginWithEmailAndPass(email, password)
         .then(resut => {
            const loggedUser = resut.user;
            console.log(loggedUser);
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
            console.log(loggedUser);
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

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Password</span>
                        </label>
                        <input type="password"  {...register("password", {
                           required: true,

                        })} placeholder="required" className="input input-bordered" />

                        <label className="label">
                           <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                     </div>

                     <div className="form-control mt-6">
                        {message && <h2 className="text-red-600">{message}</h2>}
                        <input className="btn btn-primary" type="submit" value="Register" />
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