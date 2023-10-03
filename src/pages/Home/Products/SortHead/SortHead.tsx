import { FC, useState } from 'react'
import sortHeadBtn from '../../../../assets/icon/sortHead-btn.svg'

import './SortHead.scss'

const SortHead: FC = () => {
  const [sortHeadValue, setSortHeadValue] = useState('newness')
  const sortHeadObj = [
    { title: 'Новизне', value: 'newness' },
    { title: 'Цена по возростанию', value: 'increase' },
    { title: 'Цена по убыванию', value: 'descend' },
    { title: 'Популярности', value: 'popularity' }
  ]
  return <div className='sortHead'>
    <p className="sortHead__title">Сортировать по:</p>
    <ul className="sortHead__items">
      {sortHeadObj.map((item) => (
        <li
          className={
            sortHeadValue === item.value ?
              "sortHead__item active" :
              "sortHead__item"}
          value={item.value}
          onClick={() => setSortHeadValue(item.value)}
        >
          {item.title}
          <span></span>
        </li>
      ))}
    </ul>
    <button className='sortHead__btn'>
      <img src={sortHeadBtn} alt="sortHeadBtn" />
    </button>
  </div>
}

export default SortHead