import { FC, useState } from 'react'
import './SortPrice.scss'

const SortPrice: FC = () => {
  const [sortPriceName, setSortPriceName] = useState('')
  const sortPriceItems = [
    { name: 'до 150 000руб.', value1: 0, value2: 150000 },
    { name: '150 000-500 000руб.', value1: 150000, value2: 500000 },
    { name: '500 000-1 000 000руб.', value1: 500000, value2: 1000000 },
    { name: 'от 1 000 000руб.', value1: 1000000, value2: 500000000 },
  ]
  const handleGetSortParams = (e:string) => {
    setSortPriceName(e)
  }
  return <div className='sort-price'>
    {sortPriceItems.map((item, i) => (
      <label className='sort-price__label' key={i}>
        <input type='radio' name='sort-price' className='sort-price__input' value={item.name} onChange={(e) => handleGetSortParams(e.target.value)} />
        <div className="sort-price__new-radio">
          <div className="sort-price__radio-icon">
            <span className={sortPriceName === item.name ? "sort-price__radio-icon-dot" : ''}></span>
          </div>
          <p className={sortPriceName === item.name ? "sort-price__text-active" : "sort-price__text"}>{item.name}</p>
        </div>
      </label>
    ))}
  </div>
}

export default SortPrice