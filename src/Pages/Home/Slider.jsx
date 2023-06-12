
import Heading from '../../SharedComponsnts/Heading';
import slider1 from '../../assets/images/banner/img1.jpg'
import slider2 from '../../assets/images/banner/img2.jpg'
import slider3 from '../../assets/images/banner/img3.jpg'
import slider4 from '../../assets/images/banner/img4.jpg'
import slider5 from '../../assets/images/banner/img5.jpg'

import slider7 from '../../assets/images/banner/img7.jpg'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

const Slider = () => {
   const progressCircle = useRef(null);
   const progressContent = useRef(null);
   const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
   };

   return (

      <>
         <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
               delay: 3500,
               disableOnInteraction: false,
            }}
            pagination={{
               clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
         >
            <SwiperSlide> <img src={slider5} /></SwiperSlide>
            <SwiperSlide> <img src={slider1} /></SwiperSlide>
            <SwiperSlide> <img src={slider2} /></SwiperSlide>
            <SwiperSlide><img src={slider3} /></SwiperSlide>
            <SwiperSlide><img src={slider7} /></SwiperSlide>
            <SwiperSlide><img src={slider4} /></SwiperSlide>


            <div className="autoplay-progress" slot="container-end">
               <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
               </svg>
               <span ref={progressContent}></span>
            </div>
         </Swiper>
      </>

   );
};

export default Slider;