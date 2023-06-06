import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import img1 from '../../assets/images/loginRegister/register.jpg'
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { updateProfile } from "firebase/auth";



const Register = () => {
   const [message, setMessage] = useState('');
   const { registerNewUser } = useAuth();
   // console.log(registerNewUser);


   const { register, handleSubmit, reset, formState: { errors } } = useForm();

   const onSubmit = data => {
      const { name, photoURL, email, password } = data;

      //Register User
      registerNewUser(email, password)
         .then(result => {
            setMessage('Registation Sussessful')
            const loggedUser = result.user;
            updeteUserProfile(loggedUser, name, photoURL)

            console.log(loggedUser);
         })
         .catch(error => {
            console.log(error.message)
            setMessage(error.message)
         })


      const updeteUserProfile = (loggedUser, userName, imageUrl) => {
         updateProfile(loggedUser, {
            displayName: userName, photoURL: imageUrl
         })
            .then(() => {
               console.log('user name updated');
            })
            .catch(error => console.error(error.message))
      };


   };

   return (
      <div className="hero min-h-screen bg-base-200">
         <div className="hero-content flex-col lg:flex-row-reverse">

            <div className="text-center ">
               <img width={700} src={img1} alt="Image" />
            </div>

            <div className="card flex-shrink-0 w-full max-w-sm shadow-xl border-2 bg-base-100 mx-auto">

               <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Name</span>
                     </label>
                     <input type="text"  {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                     {errors.name && <span className="text-red-500d">Name is required</span>}
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Photo URL</span>
                     </label>
                     <input type="text"  {...register("photoURL", { required: true })} placeholder="URL" className="input input-bordered" />
                     {errors.photoURL && <span className="text-red-500d">Photo Url is required</span>}
                  </div>


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
                        minLength: 6,
                        maxLength: 20,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z])/
                     })} placeholder="required" className="input input-bordered" />

                     {errors.password?.type === 'minLength' && <p role="alert">Password must be minimum 6 characters</p>}
                     {errors.password?.type === 'maxLength' && <p role="alert">Password must be less then 20 characters</p>}
                     {errors.password?.type === 'pattern' && <p role="alert">Password must have one upper case, one lower case, one number and one special character!</p>}

                     <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                     </label>
                  </div>

                  <div className="form-control mt-6">
                     {message && <h2 className="text-red-600">{message}</h2>}
                     <input className="btn btn-primary" type="submit" value="Register" />
                  </div>
               </form>

               <label className="label text-center mx-auto">
                  <p><small>Already Have an account? </small><Link to='/Login'><span className="label-text-alt link link-hover">Login</span></Link></p>
               </label>

            </div>
         </div>
      </div>
   );
};

export default Register;



