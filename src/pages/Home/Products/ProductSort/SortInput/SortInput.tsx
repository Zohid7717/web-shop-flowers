import { FC } from 'react'
import './SortInput.scss'

interface SortInputProps {
  getValue: (value: string)=>void
}

const SortInput: FC<SortInputProps> = ({getValue }) => {
  return <div className='sort-input'>
    <input
      type="text"
      placeholder='Поиск по названию...'
      className='sort-input__search'
      onChange={(event)=>getValue(event.target.value)}
    />
  </div>
}

export default SortInput