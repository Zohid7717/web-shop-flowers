import { ChangeEvent, FC, useState } from 'react'
import checkIcon from '../../../assets/icon/icon-checked.svg'
import './CustomCheckbox.scss'

interface CustomChackboxProps {
  name: string;
  setStateElement: (value: string[]) => void;
  stateElement: string[]
}

const CustomCheckbox: FC<CustomChackboxProps> = ({ name, setStateElement, stateElement }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckStateElement = (e: ChangeEvent<HTMLInputElement>) => {
    if (stateElement.includes(e.target.value)) {
      setStateElement(
        stateElement.filter(item => item !== e.target.value)
      )
    } else {
      setStateElement(
        stateElement.concat(e.target.value)
      )
    }
    setIsChecked(!isChecked);
  }

  return <div className='custom-checkbox'>
    <label className="custom-checkbox__label">
    <input type="checkbox" checked={isChecked} className="custom-checkbox__input" value={name} onChange={handleCheckStateElement} />
      <div className="custom-checkbox__new-checkbox">
        <div className={isChecked ? "custom-checkbox__checkbox-icon check-active-icon" : "custom-checkbox__checkbox-icon"}>
          <img src={checkIcon} alt="chechIcon" />
        </div>
        <p className={isChecked ? "custom-checkbox__title check-active-title" : "custom-checkbox__title"}>{name}</p>
      </div>
    </label>
  </div>
}

export default CustomCheckbox