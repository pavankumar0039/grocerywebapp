import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderComponent = () => {
  const images = [
    '/images/flat-design-grocery-store-sale-banner_23-2151069702.avif',
    
    '/images/grocery-shopping-discount-banner-paper-260nw-394204924.webp',
    
  ];

  const sliderSettings = {
    dots: true,               
    infinite: true,          
    speed: 1000,               
    slidesToShow: 1,          
    slidesToScroll: 1,        
    autoplay: true,           
    autoplaySpeed: 1000,      
  };

  return (
    <div style={{ width: '80%', margin: 'auto', paddingTop: '2rem' }}>
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
