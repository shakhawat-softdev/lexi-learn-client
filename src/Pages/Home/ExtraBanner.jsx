import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import slider1 from '../../assets/images/banner/img1.jpg'
import slider2 from '../../assets/images/banner/img2.jpg'
import slider3 from '../../assets/images/banner/img3.jpg'
import slider4 from '../../assets/images/banner/img4.jpg'


const ExtraBanner = () => {
   return (
      <div>
         <Swiper
            slidesPerView={4}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
               clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper mb-24"
         >
            <SwiperSlide>
               <img src={slider1} alt="" />
               {/* <h3 className="text-4xl text-center uppercase -mt-16 text-white">Salad</h3> */}
            </SwiperSlide>
            <SwiperSlide>
               <img src={slider2} alt="" />
               {/* <h3 className="text-4xl text-center uppercase -mt-16 text-white">Pizzas</h3> */}
            </SwiperSlide>
            <SwiperSlide>
               <img src={slider3} alt="" />
               {/* <h3 className="text-4xl text-center uppercase -mt-16 text-white">Soups</h3> */}
            </SwiperSlide>
            <SwiperSlide>
               <img src={slider4} alt="" />
               {/* <h3 className="text-4xl text-center uppercase -mt-16 text-white">Deserts</h3> */}
            </SwiperSlide>
         </Swiper>
      </div>
   );
};

export default ExtraBanner;