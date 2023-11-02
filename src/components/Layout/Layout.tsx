import { FC } from 'react'
import { TapBar } from '../TapBar/TapBar'

interface LayoutProps {
  children: JSX.Element
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <section className='grow'>{children}</section>
      <nav className='shrink w-full'>
        <TapBar />
      </nav>
    </div>
  )
}
