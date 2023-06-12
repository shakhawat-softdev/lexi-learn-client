import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import img1 from '../../assets/images/loginRegister/register.jpg'
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";



const Register = () => {
   const [message, setMessage] = useState('');
   const { registerNewUser, logout } = useAuth();
   const navigate = useNavigate()
   const [isVisible, setVisible] = useState(true);


   const { register, handleSubmit, reset, formState: { errors } } = useForm();


   const handleVisible = () => {
      setVisible(!isVisible);
   };

   const onSubmit = data => {
      const { name, photoURL, email, password, password2 } = data;
      console.log(data);

      if (password !== password2) {
         setMessage("Password doesn't matched!")
         return;
      }
      setMessage('')

      //Register User
      registerNewUser(email, password)
         .then(result => {
            reset()
            const loggedUser = result.user;
            // console.log(loggedUser);
            const userInfo = { userName: name, userEmail: email, userImage: photoURL, role: 'student' };
            fetch('https://lexi-learn-server.vercel.app/users', {
               method: 'POST',
               headers: { 'content-type': 'application/json' },
               body: JSON.stringify(userInfo)//
            })
               .then(res => res.json())
               .then(data => {
                  console.log(data.insertedId);

                  //TODO: if inserted successfully
                  if (data.insertedId) {
                     Swal.fire({ position: 'center', icon: 'success', title: 'Registation Successful!!', showConfirmButton: false, timer: 1500 });

                     updeteUserProfile(loggedUser, name, photoURL);
                     navigate('/login');
                     logout()
                        .then(result => { })
                        .catch(error => console.log(error.message))

                  }
               })

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
               // console.log('user name, image updated in firebase');
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

                     <input type={isVisible ? "password" : "text"}   {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z])/
                     })} placeholder="required" className="input input-bordered" />

                     {isVisible ? <EyeIcon onClick={handleVisible} className="h-6 w-6 text-blue-500 absolute right-0 mt-12 mr-20" /> : <EyeSlashIcon onClick={handleVisible} className="h-6 w-6 text-blue-500 absolute right-0 mt-12 mr-20" />}

                     {errors.password?.type === 'minLength' && <p role="alert">Password must be minimum 6 characters</p>}
                     {errors.password?.type === 'maxLength' && <p role="alert">Password must be less then 20 characters</p>}
                     {errors.password?.type === 'pattern' && <p role="alert">Password must have one upper case, one lower case, one number and one special character!</p>}

                     {/* <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                     </label> */}
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Re Enter Password</span>
                     </label>

                     <input type={isVisible ? "password" : "text"}   {...register("password2", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z])/
                     })} placeholder="required" className="input input-bordered" />

                     {isVisible ? <EyeIcon onClick={handleVisible} className="h-6 w-6 text-blue-500 absolute right-0 mt-12 mr-20" /> : <EyeSlashIcon onClick={handleVisible} className="h-6 w-6 text-blue-500 absolute right-0 mt-12 mr-20" />}

                     {errors.password?.type === 'minLength' && <p role="alert">Password must be minimum 6 characters</p>}
                     {errors.password?.type === 'maxLength' && <p role="alert">Password must be less then 20 characters</p>}
                     {errors.password?.type === 'pattern' && <p role="alert">Password must have one upper case, one lower case, one number and one special character!</p>}

                     {/* <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                     </label> */}
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



