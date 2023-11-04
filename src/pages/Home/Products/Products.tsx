import { FC, useEffect, useState } from 'react'
import SortHead from './SortHead/SortHead'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { BouquetType, fetchBouquet, fetchBouquetFromCat, fetchBouquetFromName, fetchByFilter } from '../../../service/redux/Slices/products/slice'
import UContainer from '../../../component/utils/UContainer/UContainer'
import ProductCard from './ProductCard/ProductCard'
import ProductSort from './ProductSort/ProductSort'
import { showMore } from '../../../service/redux/Slices/displayLimit/slice'
import { motion } from 'framer-motion'
import ProductCardSkeleton from '../../../component/Skeleton/ProductCard/ProductCardSkeleton'
import { sortByDate, sortByPriceDESC, sortByPriceABC, sortByPopularity } from '../../../service/filterFunc/filterFunc'
import './Products.scss'

export type sortHeadObjType = {
  title: string,
  value: string
}

const Products: FC = () => {
  const dispatch = useAppDispatch()
  const inputValue = useAppSelector(state => state.inputValue.value)
  const { list, loading } = useAppSelector((state) => state.dataProducts)
  const [sortHeadValue, setSortHeadValue] = useState('')
  const [lastList, setLastList] = useState<BouquetType[]>([])

  const sortHeadObj: sortHeadObjType[] = [
    { title: 'Новизне', value: 'newness' },
    { title: 'Цена по возростанию', value: 'increase' },
    { title: 'Цена по убыванию', value: 'descend' },
    { title: 'Популярности', value: 'popularity' }
  ]

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
    if (inputValue.length > 3) {
      if (sortHeadValue === 'newness') {
        dispatch(fetchBouquetFromName())
        setLastList(sortByDate(list))
      } else if (sortHeadValue === 'increase') {
        setLastList(sortByPriceABC(list))
      } else if (sortHeadValue === 'descend') {
        setLastList(sortByPriceDESC(list))
      } else if (sortHeadValue === 'popularity') {
        setLastList(sortByPopularity(list))
      } else {
        setLastList(list)
      }
    } else {
      if (sortHeadValue === 'newness') {
        dispatch(fetchByFilter())
        setLastList(sortByDate(list))
      } else if (sortHeadValue === 'increase') {
        dispatch(fetchByFilter())
        setLastList(sortByPriceABC(list))
      } else if (sortHeadValue === 'descend') {
        dispatch(fetchByFilter())
        setLastList(sortByPriceDESC(list))
      } else if (sortHeadValue === 'popularity') {
        dispatch(fetchByFilter())
        setLastList(sortByPopularity(list))
      } else {
        dispatch(fetchByFilter())
        setLastList(list)
      }
    }
  }, [inputValue, sortHeadValue])

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
            <SortHead sortHeadObj={sortHeadObj} sortHeadValue={sortHeadValue} setSortHeadValue={setSortHeadValue} />
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
          <ProductSort />
        </div>
      </div>
    </UContainer>
  </div>
}

export default Products