import { FC, useEffect, useState } from 'react'
import './SortCategory.scss'
import { useAppDispatch, useAppSelector } from '../../../../../service/redux/hooks/hooks'
import { removeCategory, setCategory } from '../../../../../service/redux/Slices/category/slice'

const categories = [
  'Монобукеты',
  'Авторские',
  'Цветы в каробке',
  'Цветы в корзине',
  'Фруктовые'
]

const SortCategory: FC = () => {
  const categoryList = useAppSelector(state => state.category)
  const dispatch = useAppDispatch()
  const handleChange = (e: string) => {
    if (categoryList.includes(e)) {
      dispatch(removeCategory(e))
    } else {
      dispatch(setCategory(e))
    }
  }
  console.log(categoryList)
  
  return <div className='sort-category'>
    {
      categories.map((item, i) => (
        <label key={i} className="sort-category__label">
          <input
            type="checkbox"
            className="sort-category__input"
            onChange={() => handleChange(item)}
            checked={categoryList.includes(item)}
          />
          <div className="sort-category__icon">
            <p className="sort-category__title">{item}</p>
          </div>
        </label>
      ))
    }

  </div>
}

export default SortCategory