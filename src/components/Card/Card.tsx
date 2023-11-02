import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Meal } from '../../types/meals';

type CardProps = {
  meal: Meal;
};

export const Card: FC<CardProps> = ({ meal }) => {
  const { name, mealImage, kCal, prepTime, id } = meal;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Image
        src={mealImage!}
        alt={name!}
        width={200}
        height={100}
        className="object-cover h-[12rem] w-full"
      />
      <div className="px-6 pb-2 h-36 flex flex-col justify-between">
        <div className="pt-4">
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
        </div>
        <div className="flex justify-between w-full">
          <div>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {kCal}kCal
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {prepTime}min
            </span>
          </div>
          <div>
            <Link
              href={`/meal/${id}`}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              Aperçu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
