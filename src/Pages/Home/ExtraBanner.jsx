import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { FreeMode, Pagination } from "swiper";
import slider1 from '../../assets/images/banner/img1.jpg'
import slider2 from '../../assets/images/banner/img2.jpg'
import slider3 from '../../assets/images/banner/img3.jpg'
import slider4 from '../../assets/images/banner/img4.jpg'
import slider5 from '../../assets/images/banner/img5.jpg'

import slider7 from '../../assets/images/banner/img7.jpg'


const ExtraBanner = () => {
   return (
      <div>
         <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={{
               clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
         >
            <SwiperSlide>
               <img src={slider1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src={slider5} alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src={slider2} alt="" />
            </SwiperSlide>

            <SwiperSlide>
               <img src={slider3} alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src={slider4} alt="" />
            </SwiperSlide>
            <SwiperSlide>
               <img src={slider7} alt="" />
            </SwiperSlide>

         </Swiper>
      </div>
   );
};

export default ExtraBanner;