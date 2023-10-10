import { FC, useState } from 'react'
import './SortPrice.scss'
import CustomRadio from '../../../../../component/ui/customRadio/CustomRadio'

const SortPrice: FC = () => {
  const [sortPriceName, setSortPriceName] = useState('')
  const sortPriceItems = [
    { name: 'до 150 000руб.', value1: 0, value2: 150000 },
    { name: '150 000-500 000руб.', value1: 150000, value2: 500000 },
    { name: '500 000-1 000 000руб.', value1: 500000, value2: 1000000 },
    { name: 'от 1 000 000руб.', value1: 1000000, value2: 500000000 },
  ]
  
  return <div className='sort-price'>
    {sortPriceItems.map((item, i) => (
      <CustomRadio key={i} stateElement={sortPriceName} name={item.name} nameRadio='sort-price' setStateElement={setSortPriceName}/>
    ))}
  </div>
}

export default SortPrice