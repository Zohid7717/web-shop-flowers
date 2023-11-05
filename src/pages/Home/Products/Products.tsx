import { FC, useEffect, useState } from 'react'
import SortHead from './SortHead/SortHead'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { BouquetType, fetchBouquet, fetchBouquetFromName, fetchByFilter } from '../../../service/redux/Slices/products/slice'
import UContainer from '../../../component/utils/UContainer/UContainer'

import ProductSort from './ProductSort/ProductSort'
import { showMore } from '../../../service/redux/Slices/displayLimit/slice'



import './Products.scss'
import CardBlock from './CardBlock/CardBlock'

export type sortHeadObjType = {
  title: string,
  value: string
}

const Products: FC = () => {
  const dispatch = useAppDispatch()
  const [sortHeadValue, setSortHeadValue] = useState('')

  const sortHeadObj: sortHeadObjType[] = [
    { title: 'Новизне', value: 'newness' },
    { title: 'Цена по возростанию', value: 'increase' },
    { title: 'Цена по убыванию', value: 'descend' },
    { title: 'Популярности', value: 'popularity' }
  ]

  const handleShowMore = () => {
    dispatch(showMore())
  }
  dispatch(fetchByFilter())
  return <div className='products'>
    <UContainer>
      <div className="products__wrap">
        <div className="products__main">
          <div className="products__main-head">
            <SortHead sortHeadObj={sortHeadObj} sortHeadValue={sortHeadValue} setSortHeadValue={setSortHeadValue} />
          </div>
          <CardBlock sortHeadValue={sortHeadValue} />
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