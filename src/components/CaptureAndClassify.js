import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const CaptureAndClassify = ({ onClassify }) => {
  const webcamRef = useRef(null);

  const capture = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const base64Image = imageSrc.split(',')[1];

      const response = await axios.post('/api/classify-image', { image: base64Image });

      const labels = response.data.labels;
      const primaryLabel = labels.length > 0 ? labels[0] : 'Unknown';
      onClassify(primaryLabel);
    } catch (error) {
      console.error('Error classifying the image:', error);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
      />
      <button onClick={capture}>Capture and Classify</button>
    </div>
  );
};

export default CaptureAndClassify;
