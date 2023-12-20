import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../service/redux/hooks/hooks'
import { addFlower, getFlowers, removeFlower } from '../../service/redux/Slices/flowers/slice'
import { useAppSelector } from '../../service/redux/hooks/hooks'
import { FlowerType } from '../../utils/types'

import './FlowerInput.scss'

type PropsType = {
  bouquetComposition: FlowerType[]
  setBouquetComposition: React.Dispatch<React.SetStateAction<FlowerType[]>>
}

const FlowerInput: FC<PropsType> = ({ bouquetComposition, setBouquetComposition }) => {
  const flowers = useAppSelector(state => state.flowers.list)
  const [pushFlower, setPushFlower] = useState('')
  const dispatch = useAppDispatch()
  const handleAddFlower = () => {
    dispatch(addFlower({ flower_name: pushFlower }))
  }
  const handleDeleteFlower = (id: string) => {
    dispatch(removeFlower({ flower_id: id }))
  }

  const handleCheckboxChange = (flower: FlowerType) => {
    const flowerIndex = bouquetComposition.findIndex((f) => f._id === flower._id)
    if (flowerIndex !== -1) {
      const updateSelectedFlowers = [...bouquetComposition]
      updateSelectedFlowers.splice(flowerIndex, 1)
      setBouquetComposition(updateSelectedFlowers)
    } else {
      setBouquetComposition([...bouquetComposition, flower])
    }
  }

  useEffect(() => {
    dispatch(getFlowers())
  }, [])
  return <div className='flower-selector'>
    <div className='flower-selector__checkboxes'>
      Выбирайте цветы
      {
        flowers && flowers.map(item => (
          <div key={item._id} className="flower-selector__set">
            <label>
              <input
                type="checkbox"
                value={item.flower_name}
                checked={bouquetComposition.some((f) => f._id === item._id)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item.flower_name}
            </label>
            <button onClick={() => handleDeleteFlower(item._id)}>Удалить</button>
          </div>
        ))
      }
    </div>
    <div className="flower-input__add">
      <label>
        Добавить цветок
        <input
          type="text"
          placeholder='Название цветка'
          onChange={(e) => setPushFlower(e.target.value)}
        />
      </label>
      <button onClick={handleAddFlower}>Добавить</button>
    </div>

  </div>
}

export default FlowerInput