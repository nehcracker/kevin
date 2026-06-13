// src/components/common/ServiceSlider/ServiceSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ServiceSlider.css';

const ServiceSlider = ({ services }) => (
  <div className="service-slider">
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      loop
      autoplay={{ delay: 3200, pauseOnMouseEnter: true, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        0:    { slidesPerView: 1, spaceBetween: 16 },
        640:  { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      }}
    >
      {services.map((svc) => (
        <SwiperSlide key={svc.num}>
          <Link to={svc.path} className="ss-card" aria-label={svc.title}>
            <div className="ss-card-icon" style={{ color: svc.color }}>
              <i className={svc.icon} aria-hidden="true" />
            </div>
            <div className="ss-card-num">{svc.num}</div>
            <h3 className="ss-card-title">{svc.title}</h3>
            <p className="ss-card-sub">{svc.sub}</p>
            <p className="ss-card-body">{svc.body}</p>
            <span className="ss-card-link">
              Learn more <i className="fas fa-arrow-right" aria-hidden="true" />
            </span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default ServiceSlider;
