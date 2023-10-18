import { FC, useEffect, useState } from 'react'
import SortHead from './SortHead/SortHead'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { fetchBouquet, fetchBouquetFromCat, fetchBouquetFromName } from '../../../service/redux/Slices/products/slice'
import UContainer from '../../../component/utils/UContainer/UContainer'
import ProductCard from './ProductCard/ProductCard'
import ProductSort from './ProductSort/ProductSort'
import { showMore } from '../../../service/redux/Slices/displayLimit/slice'
import { motion } from 'framer-motion'

import './Products.scss'
import ProductCardSkeleton from '../../../component/Skeleton/ProductCard/ProductCardSkeleton'

const Products: FC = () => {
  const displayLimit = useAppSelector((state) => state.displayLimit.value)
  const dispatch = useAppDispatch()
  const categoryValue = useAppSelector(state => state.category.value)
  const inputValue = useAppSelector(state => state.inputValue.value)
  const { list, loading } = useAppSelector((state) => state.dataProducts)
  const [sortPriseObj, setSortPriceObj] = useState<{
    name: string;
    value1: number;
    value2: number;
  }>({
    name: '',
    value1: 0,
    value2: 0
  })
  const [lastList, setLastList]=useState([])
  console.log(sortPriseObj)
  const handleShowMore = () => {
    dispatch(showMore())
  }
  const listVariants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      }
    }),
    hidden: { opacity: 0 }
  }

  useEffect(() => {
    if (inputValue.length > 0) {
      dispatch(fetchBouquetFromName())
    } else {
      if (categoryValue) {
        dispatch(fetchBouquetFromCat())
      } else {
        dispatch(fetchBouquet())
      }
    }
  }, [displayLimit, inputValue])

  useEffect(() => {
    if (sortPriseObj.value2 > 1) {
      let newArr=[]
      list.forEach(item => {
        item.size.forEach(element => {
          if (element.price > sortPriseObj.value1 && element.price < sortPriseObj.value2) {
            newArr.push(item)
          }
        })
      })
      setLastList(newArr)
    } else {
      setLastList(list)
    }
  },[sortPriseObj])

  const bouquet = lastList.map((item, i) => (
    <motion.div
      key={item.id}
      variants={listVariants}
      initial='hidden'
      animate='visible'
      custom={i}
    >
      <ProductCard {...item} />
    </motion.div>
  ))
  const skeleton = [...new Array(3)].map((_, i) => <ProductCardSkeleton key={i} />)
  return <div className='products'>
    <UContainer>
      <div className="products__wrap">
        <div className="products__main">
          <div className="products__main-head">
            <SortHead />
          </div>
          <div className="products__main-list">
            {loading === true ?
              skeleton :
              bouquet}
          </div>
          <button className='products__show-more green' onClick={() => handleShowMore()}>
            Показать еще
          </button>
        </div>
        <div className="products__sort">
          <ProductSort setSortPriceObj={setSortPriceObj} />
        </div>
      </div>
    </UContainer>
  </div>
}

export default Products