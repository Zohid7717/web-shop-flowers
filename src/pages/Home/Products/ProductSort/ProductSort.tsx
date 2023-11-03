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
import { resetProductPrice } from '../../../../service/redux/Slices/productPrice/slice'
import { setResetFilterFalse, setResetFilterTrue } from '../../../../service/redux/Slices/resetFilter/slise'
import { resetProductItems } from '../../../../service/redux/Slices/productItems/slice'

const ProductSort: FC = () => {
  const resetFilterState = useAppSelector(state => state.resetFilter.value)
  const category = useAppSelector(state => state.category.value)
  const input = useAppSelector(state => state.inputValue.value)
  const items = useAppSelector(state => state.productItems.value)
  const price = useAppSelector(state => state.productPrice)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [sortInputValue, setSortInputValue] = useState<string>('')
  const dispatch = useAppDispatch()
  const dis = () => {
    dispatch(fetchByFilter())
    dispatch(setResetFilterFalse())
    console.log(category)
    console.log(items)
    console.log(resetFilterState)
  }
  const resetFilter = () => {
    dispatch(setResetFilterTrue())
    dispatch(resetProductItems())
    dispatch(resetCategory())
    dispatch(resetProductPrice())
    dispatch(fetchByFilter())
    console.log()
    console.log(items)
    console.log(resetFilterState)
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
      <SortPrice />
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
      <button className='UBtn-active product-sort__btn-clear' onClick={() => resetFilter()}>Очистить</button>
      <button className='UBtn-active product-sort__btn-submit' onClick={() => dis()}>Поиск</button>
    </div>
  </div>
}

export default ProductSort