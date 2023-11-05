import { FC, useEffect } from 'react'
import Hero from './Hero/Hero'

import './Home.scss'
import Advantage from './Advantage/Advantage'
import Products from './Products/Products'
import { useAppDispatch } from '../../service/redux/hooks/hooks'
import { fetchBouquet } from '../../service/redux/Slices/products/slice'

const Home: FC = () => {
  const dispatch=useAppDispatch()
  return <div>
    <Hero />
    <Advantage />
    <Products/>
  </div>
}

export default Home