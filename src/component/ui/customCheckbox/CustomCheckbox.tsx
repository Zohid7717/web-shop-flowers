import { FC } from 'react'
import checkIcon from '../../../assets/icon/icon-checked.svg'
import './CustomCheckbox.scss'

interface CustomChackboxProps {
  name: string;
  setStateElement: (value: string)=> void;
}

const CustomCheckbox: FC<CustomChackboxProps> = ({ name, setStateElement }) => {



  return <div className='custom-checkbox'>
    <label className="custom-checkbox__label">
      <input type="checkbox" className="custom-checkbox__input" onChange={()=>setStateElement(name)} />
      <div className="custom-checkbox__new-">
        <div className="custom-checkbox__checkbox-icon">
          <img src={checkIcon} alt="chechIcon" />
        </div>
        <p className='custom-checkbox__title'>{name}</p>
      </div>
    </label>
  </div>
}

export default CustomCheckbox