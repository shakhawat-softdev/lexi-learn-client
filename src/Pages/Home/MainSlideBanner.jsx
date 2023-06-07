import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import slider1 from '../../assets/images/banner/img1.jpg'
import slider2 from '../../assets/images/banner/img2.jpg'
import slider3 from '../../assets/images/banner/img3.jpg'
import slider4 from '../../assets/images/banner/img4.jpg'


const MainSlideBanner = () => {
   return (
      <div>
         <Carousel>

            <div>
               <img src={slider1} />
               {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
               <img src={slider2} />
               {/* <p className="legend">Legend 2</p> */}
            </div>
            <div>
               <img src={slider3} />
               {/* <p className="legend">Legend 3</p> */}
            </div>
            <div>
               <img src={slider4} />
               {/* <p className="legend">Legend 1</p> */}
            </div>

         </Carousel>
      </div>
   );
};

export default MainSlideBanner;