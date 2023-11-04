import { FC } from 'react'
import sortHeadBtn from '../../../../assets/icon/sortHead-btn.svg'

import './SortHead.scss'
import { sortHeadObjType } from '../Products'

type SortHeadType = {
  sortHeadObj: sortHeadObjType[],
  sortHeadValue: string,
  setSortHeadValue: (value: string)=>void
}

const SortHead: FC<SortHeadType> = ({sortHeadObj, sortHeadValue, setSortHeadValue}) => {
  return <div className='sortHead'>
    <p className="sortHead__title">Сортировать по:</p>
    <ul className="sortHead__items">
      {sortHeadObj.map((item, i) => (
        <li
          key={i}
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