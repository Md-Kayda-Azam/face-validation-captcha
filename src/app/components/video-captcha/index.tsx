'use client';
import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

const VideoStreamCaptcha: React.FC<{
  onCapture: (
    image: string,
    boxPosition: { top: number; left: number }
  ) => void;
}> = ({ onCapture }) => {
  const [boxPosition, setBoxPosition] = useState<{ top: number; left: number }>(
    { top: 50, left: 50 }
  );
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const randomizeBoxPosition = () => {
      const top = Math.floor(Math.random() * 50);
      const left = Math.floor(Math.random() * 50);
      setBoxPosition({ top, left });
    };

    const intervalId = setInterval(randomizeBoxPosition, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc, boxPosition);
      }
    }
  };

  return (
    <div className="relative">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-auto"
      />
      <div
        style={{ top: `${boxPosition.top}%`, left: `${boxPosition.left}%` }}
        className="absolute w-16 h-16 bg-red-500 opacity-50"
      />
      <div className="max-auto flex justify-center items-center">
        <button
          onClick={capture}
          className="mt-4 px-4 py-2 bg-blue-500 text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default VideoStreamCaptcha;
