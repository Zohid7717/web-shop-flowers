import { FC } from 'react'
import SortInput from './SortInput/SortInput'
import SortPrice from './SortPrice/SortPrice'
import SortCategory from './SortCategory/SortCategory'
import './ProductSort.scss'
import SortItems from './SortItems/SortItems'

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
    <div className="product-sort__items">
      <p className="product-sort__items-title">Букеты с...</p>
      <SortItems/>
    </div>
    <div className="product-sort__btn">
      <button className='UBtn-active product-sort__btn-clear'>Очистить</button>
      <button className='UBtn-active product-sort__btn-submit'>Поиск</button>
    </div>
  </div>
}

export default ProductSort