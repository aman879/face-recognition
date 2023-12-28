import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      {imageUrl.length !== 0 ? (
        <div className="absolute">
          <img
            id='inputImage'
            alt=""
            src={imageUrl}
            className="face-image"
            width="500px"
            height="290px"
          />
          {boxes.map((box, index) => (
            <div
              key={index}
              className='bounding-box'
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FaceRecognition;
