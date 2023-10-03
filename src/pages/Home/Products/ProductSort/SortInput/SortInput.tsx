import { FC, useState } from 'react'

const SortInput: FC = () => {
  const [sortInputValue, setSortInputValue] = useState('')
  
  console.log(sortInputValue)
  return <div className='sort-input'>
    <input
      type="text"
      placeholder='Поиск по ключивым словам...'
      className='sort-input__search'
      onChange={(event)=>setSortInputValue(event.target.value)}
    />
  </div>
}

export default SortInput