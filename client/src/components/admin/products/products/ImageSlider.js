import React from 'react';
import { Carousel } from 'antd';

const ImagesSlider = props => {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: '100%', maxHeight: '150px' }}
              src={`http://localhost:5002/${image}`}
              alt='product'
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImagesSlider;
