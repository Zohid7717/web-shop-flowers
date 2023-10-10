import { FC } from 'react'
import SortInput from './SortInput/SortInput'
import SortPrice from './SortPrice/SortPrice'
import SortCategory from './SortCategory/SortCategory'
import './ProductSort.scss'

const ProductSort: FC = () => {
  return <div className='product-sort'>
    <div className="product-sort__input">
      <SortInput/>
    </div>
    <div className="product-sort__price">
      <p className="product-sort__price-title">Стоимость:</p>
      <SortPrice/>
    </div>
    <div className="product-sort__category">
      <p className="product-sort__category-title">Категории:</p>
      <SortCategory/>
    </div>
    
  </div>
}

export default ProductSort