import Link from 'next/link';
import { FC } from 'react';

export const TapBar: FC = () => {
  return (
    <ul className="flex justify-evenly items-center">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/meals">Meals</Link>
      </li>
      <li>
        <Link href="/cart">Cart</Link>
      </li>
      <li>
        <Link href="/favorites">Favorites</Link>
      </li>
      <li>
        <Link href="/newMeal">New meal</Link>
      </li>
    </ul>
  );
};
