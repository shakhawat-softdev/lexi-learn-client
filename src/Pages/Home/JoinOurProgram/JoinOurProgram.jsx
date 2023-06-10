// import slider4 from '../../assets/images/banner/img4.jpg'
import joinusImg1 from '../../../assets/images/joinus/join1.jpg'

const JoinOurProgram = () => {
   return (
      <div>
         <div className="text-center mt-5">
            <h2 className="text-4xl font-semibold">Join Our <span className="text-yellow-500">Program</span> </h2>
            <div className="divider w-1/2 mx-auto"></div>
         </div>

         <div className="w-full flex gap-5 ">
            <div className="w-3/5 bg-slate-400">
               <img src={joinusImg1} alt="" />
            </div>
            <div className="w-2/5 bg-slate-200 rounded-md ">
               <div className='m-5'>

                  <h2 className='text-3xl font-bold mb-5'>Enroll in Our Language Program Today!"</h2>
                  <ul className="menu menu-lg bg-base-200 w-56 rounded-box ">
                     <div className='space-y-3 p-3'>
                        <li className='badge badge-neutral'>Spanish Language</li>
                        <li className='badge badge-primary'>French Language</li>
                        <li className='badge badge-secondary'>German Language</li>
                        <li className='badge badge-accent'>Chinese Language</li>
                        <li className='badge badge-primary'>Japanese Language</li>
                        <li className='badge badge-neutral'>Russian Language</li>
                     </div>
                  </ul>

                  <div className='m-auto mt-5'>
                     <span className="footer-title">New update</span>
                     <div className="form-control w-80">
                        <label className="label">
                           <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="relative">
                           <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" />
                           <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </div>


      </div>
   );
};

export default JoinOurProgram;