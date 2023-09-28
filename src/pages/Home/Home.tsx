import { FC } from 'react'
import Hero from './Hero/Hero'

import './Home.scss'
import Advantage from './Advantage/Advantage'

const Home: FC = () => {
  return <div>
    <Hero />
    <Advantage/>
  </div>
}

export default Home