'use client';
import React, { useEffect, useState } from 'react';

type GridCaptchaProps = {
  image: string;
  boxPosition: { top: number; left: number };
  onValidate: (isValid: boolean) => void;
};

const GridCaptcha: React.FC<GridCaptchaProps> = ({
  image,
  boxPosition,
  onValidate,
}) => {
  const [sectors, setSectors] = useState<
    { id: number; hasWatermark: boolean; selected: boolean }[]
  >([]);
  const [targetShape, setTargetShape] = useState<
    'circle' | 'square' | 'triangle'
  >('circle');

  useEffect(() => {
    const initSectors = Array(9)
      .fill(0)
      .map((_, i) => ({
        id: i,
        hasWatermark: Math.random() > 0.5,
        selected: false,
      }));
    setSectors(initSectors);

    const shapes = ['circle', 'square', 'triangle'] as const;
    setTargetShape(shapes[Math.floor(Math.random() * shapes.length)]);
  }, []);

  const handleSectorClick = (id: number) => {
    setSectors(
      sectors.map((sector) =>
        sector.id === id ? { ...sector, selected: !sector.selected } : sector
      )
    );
  };

  const validateCaptcha = () => {
    const correctSelections = sectors.every(
      (sector) =>
        (sector.hasWatermark && sector.selected) ||
        (!sector.hasWatermark && !sector.selected)
    );
    onValidate(correctSelections);
  };

  return (
    <div>
      <img src={image} alt="Captured" className="relative" />
      <div
        className="absolute grid grid-cols-3 grid-rows-3 gap-1"
        style={{ top: `${boxPosition.top}%`, left: `${boxPosition.left}%` }}
      >
        {sectors.map((sector) => (
          <div
            key={sector.id}
            className={`w-16 h-16 ${
              sector.selected ? 'bg-blue-200' : 'bg-transparent'
            }`}
            onClick={() => handleSectorClick(sector.id)}
          >
            {sector.hasWatermark && (
              <div className={`watermark ${targetShape}`}></div>
            )}
          </div>
        ))}
      </div>
      <div className="max-auto flex justify-center items-center">
        <button
          onClick={validateCaptcha}
          className="mt-4 px-4 py-2 bg-green-500 text-white"
        >
          Validate
        </button>
      </div>
    </div>
  );
};

export default GridCaptcha;
