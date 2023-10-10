import { FC } from 'react'



const CustomCheckbox: FC<string> = ({name}) => {

  return <div className='custom-checkbox'>
    <label className="custom-checkbox">
      <input type="checkbox"/>
    </label>
  </div>
}

export default CustomCheckbox