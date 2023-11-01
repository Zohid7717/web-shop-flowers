import { FC, useEffect, useState } from 'react'
import SortInput from './SortInput/SortInput'
import SortPrice from './SortPrice/SortPrice'
import SortCategory from './SortCategory/SortCategory'
import './ProductSort.scss'
import SortItems from './SortItems/SortItems'
import { useAppDispatch, useAppSelector } from '../../../../service/redux/hooks/hooks'
import { resetInput, setInput } from '../../../../service/redux/Slices/inputValue/slice'
import { fetchByFilter } from '../../../../service/redux/Slices/products/slice'
import { resetCategory } from '../../../../service/redux/Slices/category/slice'
import { resetProductItems } from '../../../../service/redux/Slices/productItems/slice'
import { resetProductPrice } from '../../../../service/redux/Slices/productPrice/slice'

const ProductSort: FC = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [sortInputValue, setSortInputValue] = useState<string>('')
  const dispatch = useAppDispatch()
  const dis = () => {
    dispatch(fetchByFilter())
  }
  const resetFilter = () => {
    dispatch(resetCategory())
    dispatch(resetInput())
    dispatch(resetProductItems())
    dispatch(resetProductPrice())
  }
  useEffect(() => {
    if (sortInputValue.length > 3) {
      setIsDisabled(true)
      dispatch(setInput(sortInputValue))
    } else {
      setIsDisabled(false)
      dispatch(setInput(''))
    }
  }, [sortInputValue])
  return <div className='product-sort'>
    <div className="product-sort__input">
      <SortInput getValue={setSortInputValue} />
    </div>
    <div className="product-sort__price">
      <p className="product-sort__price-title">Стоимость:</p>
      <SortPrice/>
    </div>
    <div className="product-sort__category">
      <p className="product-sort__category-title">Категории:</p>
      <SortCategory isDisabled={isDisabled} />
    </div>
    <div className="product-sort__items">
      <p className="product-sort__items-title">Букеты с...</p>
      <SortItems isDisabled={isDisabled} />
    </div>
    <div className="product-sort__btn">
      <button className='UBtn-active product-sort__btn-clear' onClick={()=>resetFilter()}>Очистить</button>
      <button className='UBtn-active product-sort__btn-submit' onClick={()=>dis()}>Поиск</button>
    </div>
  </div>
}

export default ProductSort