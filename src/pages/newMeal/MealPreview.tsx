import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import clsx from 'classnames';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';

interface MealPreviewProps {
  meal: {
    title: string;
    image: string;
    ingredients: {
      imgSrc: string;
      quantity: string;
      ingredient: string;
    }[];
  };
}

export const MealPreview: FC<MealPreviewProps> = ({ meal }) => {
  const [showModal, setShowModal] = useState(true);
  const previewElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShowModal(true);
  }, [meal]);

  useOnClickOutside(previewElement, (e: MouseEvent): void => {
    setShowModal(false);
  });

  return (
    <div className={clsx('h-screen w-screen bg-black/70 absolute', !showModal && 'hidden')}>
      <div
        ref={previewElement}
        className="px-12 py-4 bg-white mt-4 mx-auto rounded-md h-[calc(100vh-32px)] overflow-scroll w-1/2"
      >
        <h1 className="text-xl font-semibold py-2">{meal.title}</h1>
        <Image src={meal.image} alt={meal.title} width={600} height={337} />
        <div className="w-full grid grid-cols-2 mt-4 gap-4">
          {meal.ingredients.map((ing) => (
            <div key={ing.ingredient} className="flex items-center mt-1 gap-4">
              <Image src={ing.imgSrc} alt={ing.ingredient} width={48} height={48} />
              <div className="flex flex-col">
                <p>{ing.quantity}</p>
                <p>{ing.ingredient}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-8">Save</button>
        </div>
      </div>
    </div>
  );
};
