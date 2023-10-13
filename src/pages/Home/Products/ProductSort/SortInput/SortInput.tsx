import { FC, useState } from 'react'
import './SortInput.scss'

const SortInput: FC = () => {
  const [setSortInputValue] = useState('')
  
  return <div className='sort-input'>
    <input
      type="text"
      placeholder='Поиск по названию...'
      className='sort-input__search'
      onChange={(event)=>setSortInputValue(event.target.value)}
    />
  </div>
}

export default SortInput