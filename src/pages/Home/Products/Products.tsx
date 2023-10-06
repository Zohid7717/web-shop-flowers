import { FC, useEffect } from 'react'
import SortHead from './SortHead/SortHead'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { fetchBouquet } from '../../../service/redux/Slices/products/slise'
import UContainer from '../../../component/utils/UContainer/UContainer'
import ProductCard from './ProductCard/ProductCard'
import ProductSort from './ProductSort/ProductSort'
import { showMore } from '../../../service/redux/Slices/displayLimit/slice'
import { motion } from 'framer-motion'

import './Products.scss'

const Products: FC = () => {
  const displayLimit = useAppSelector((state) => state.displayLimit.value)
  const dispatch = useAppDispatch()
  const dataProducts = useAppSelector((state) => state.dataProducts.list)
  const handleShowMore = () => {
    dispatch(showMore())
  }
  const listVariants = {
    visible: (i:number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      }
    }),
    hidden: { opacity: 0 }
  }
  useEffect(() => {
    dispatch(fetchBouquet())
  }, [displayLimit])
  console.log(dataProducts)
  return <div className='products'>
    <UContainer>
      <div className="products__wrap">
        <div className="products__main">
          <div className="products__main-head">
            <SortHead />
          </div>
          <div className="products__main-list">
            {dataProducts.map((item, i) => (
              <motion.div
                key={item.id}
                variants={listVariants}
                initial='hidden'
                animate='visible'
                custom={i}
              >
                <ProductCard {...item} />
              </motion.div>
            ))}
          </div>
          <button className='products__show-more green' onClick={() => handleShowMore()}>
            Показать еще
          </button>
        </div>
        <div className="products__sort">
          <ProductSort />
        </div>
      </div>
    </UContainer>
  </div>
}

export default Products