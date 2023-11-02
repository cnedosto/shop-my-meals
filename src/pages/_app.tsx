import { MealsProvider } from '@/context/mealsContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MealsProvider>
      <Component {...pageProps} />
    </MealsProvider>
  );
}
