import { FC } from 'react'
import Hero from './Hero/Hero'

import './Home.scss'
import Advantage from './Advantage/Advantage'
import Products from './Products/Products'

const Home: FC = () => {
  return <div>
    <Hero />
    <Advantage />
    <Products/>
  </div>
}

export default Home