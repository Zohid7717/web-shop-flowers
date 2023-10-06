import { FC } from 'react'
import './ProductSort.scss'
import SortInput from './SortInput/SortInput'
import SortPrice from './SortPrice/SortPrice'

const ProductSort: FC = () => {
  return <div className='product-sort'>
    <div className="product-sort__input">
      <SortInput/>
    </div>
    <div className="product-sort__price">
      <p className="product-sort__price-title">Стоимость:</p>
      <SortPrice/>
    </div>
    
  </div>
}

export default ProductSort