import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
//import { Icon } from 'antd';
import axios from 'axios';

const FileUpload = props => {
  const [Images, setImages] = useState([]);

  const onDrop = files => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };
    formData.append('file', files[0]);

    axios.post('/api/products/uploadImage', formData, config).then(response => {
      if (response.data.success) {
        setImages([...Images, response.data.image]);
        props.refreshFunction([...Images, response.data.image]);
      } else {
        alert('Failed to save the Image in Server');
      }
    });
  };

  const onDelete = image => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div className='d-flex justify-content-between'>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={2000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '300px',
              height: '240px',
              display: 'flex',
              border: '1px solid lightgray',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <h6>Нажать для выбора изображения</h6>
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll'
        }}
      >
        {Images.map((image, index, id) => (
          <div onClick={() => onDelete(image)} key={id}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:5002/${image}`}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
