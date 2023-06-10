import logo1 from '../../../assets/images/logos/logo1.jpg'

const Footer = () => {
   return (
      <footer>
         <div className="footer p-10 bg-base-200 text-base-content">
            <div>
               <div className=" invisible lg:visible">
                  <img className="h-16  rounded-lg" src={logo1} alt="" />
               </div>

               <p>LexiLearn<br />Providing reliable service since 2022</p>
            </div>
            <div>
               <span className="footer-title">Services</span>
               <a className="link link-hover">Language</a>
               <a className="link link-hover">Speaking</a>
               <a className="link link-hover">Writing</a>
               <a className="link link-hover">Consulting</a>
            </div>
            <div>
               <span className="footer-title">Our Company</span>
               <a className="link link-hover">About us</a>
               <a className="link link-hover">Contact</a>
               <a className="link link-hover">Jobs</a>
               <a className="link link-hover">Press kit</a>
            </div>
            <div>
               <span className="footer-title">Legal</span>
               <a className="link link-hover">Terms of use</a>
               <a className="link link-hover">Privacy policy</a>
               <a className="link link-hover">Cookie policy</a>
            </div>
         </div>
         <div className="footer footer-center p-4 bg-base-300 text-base-content">
            <p>Copyright © 2023 - All right reserved by LexiLearn</p>
         </div>
      </footer>

   );
};

export default Footer;