import { FC } from 'react'
import './CustonRadio.scss'

type CustomRadioType = {
  name: string;
  nameRadio: string;
  stateElement: string;
  setStateElement: (value: string) => void;
}

const CustomRadio: FC<CustomRadioType> = ({name, nameRadio, stateElement , setStateElement}) => {
  const handleGetSortParams = (e:string) => {
    setStateElement(e)
  }
  return <div className='custom-radio'>
    <label className='custom-radio__label'>
      <input type='radio' name={nameRadio} className='custom-radio__input' value={name} onChange={(e) => handleGetSortParams(e.target.value)} />
      <div className="custom-radio__new-radio">
        <div className="custom-radio__radio-icon">
          <span className={stateElement === name ? "custom-radio__radio-icon-dot" : ''}></span>
        </div>
        <p className={stateElement === name ? "custom-radio__text-active" : "custom-radio__text"}>{name}</p>
      </div>
    </label>
  </div>
}

export default CustomRadio