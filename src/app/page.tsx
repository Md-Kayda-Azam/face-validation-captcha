'use client';

import React, { useState } from 'react';
import GridCaptcha from './components/grid-captcha';
import VideoStreamCaptcha from './components/video-captcha';

export default function Home() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [boxPosition, setBoxPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean | null>(null);

  const handleCapture = (
    image: string,
    position: { top: number; left: number }
  ) => {
    setCapturedImage(image);
    setBoxPosition(position);
  };

  const handleValidation = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
  };

  return (
    <>
      <div className="max-auto flex justify-center items-center mt-10">
        <div className="container h-auto w-[600px] p-5 bg-[#e5e5e5]">
          <div className="bg-[#03285d] p-8">
            <div className="bg-white p-10">
              <div className="max-auto flex justify-center items-center mb-3">
                <h2 className="text-xl text-[#0768ef]">Face Validation</h2>
              </div>
              {!capturedImage && (
                <VideoStreamCaptcha onCapture={handleCapture} />
              )}

              {capturedImage && boxPosition && isCaptchaValid === null && (
                <GridCaptcha
                  image={capturedImage}
                  boxPosition={boxPosition}
                  onValidate={handleValidation}
                />
              )}

              {isCaptchaValid !== null && (
                <div className="mt-4">
                  {isCaptchaValid ? (
                    <p className="text-red-500">
                      Captcha Failed. Please try again.
                    </p>
                  ) : (
                    <p className="text-green-500">Captcha Passed!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
