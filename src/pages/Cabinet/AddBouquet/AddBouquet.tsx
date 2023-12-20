import { FC, useState } from 'react'
import { useForm } from "react-hook-form";
import {BouquetType, FlowerType } from '../../../utils/types';
import FlowerInput from '../../../component/FlowerInput/FlowerInput';
import AddImage from '../../../component/AddImage/AddImage';

const category = [
  { name: 'Монобукеты' },
  { name: 'Авторские' },
  { name: 'Цветы в каробке' },
  { name: 'Цветы в корзине' }

]

const AddBouquet: FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const [bouquetComposition, setBouquetComposition] = useState<FlowerType[]>([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors}
  } = useForm<BouquetType>({
    mode: 'onChange'
  })

  
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    reset()
  })

  return <div className='add-bouquet'>
    <form onSubmit={onSubmit} className='add-boutuet__form'>
      <div className="add-form__inputs">
        <label className='add-boutuet__form-input form-label'>
          Наименование букета
          <input
            className='add-form__input form-input'
            placeholder='Наименование продукта'
            {...register("name", {
              required: 'Поля обязательно к заполнению!'
            })}
          />
          {errors?.name && <p>{errors.name?.message || 'Error!'}</p>}
        </label>
        <select
          {...register("category")}
        >
          {category.map(item => (
            <option value={item.name}>{item.name}</option>
          ))}
        </select>

      </div>
      <button type='submit'>Создать букет</button>
    </form>
    <FlowerInput bouquetComposition={bouquetComposition} setBouquetComposition={setBouquetComposition} />
    <AddImage selectedFiles={ selectedFiles} setSelectedFiles={setSelectedFiles} />
  </div>
}

export default AddBouquet