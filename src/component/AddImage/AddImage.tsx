import { FC, ChangeEvent, useRef, useState, useEffect } from 'react'
import { useAppDispatch } from '../../service/redux/hooks/hooks'
import './AddImage.scss'

type AddImagePropsType = {
  addImageValid: boolean
  setAddImageValid: React.Dispatch<React.SetStateAction<boolean>>
  images: FileList | null
  setImages: React.Dispatch<React.SetStateAction<FileList | null>>
}

const AddImage: FC<AddImagePropsType> = ({ addImageValid, setAddImageValid, images, setImages}) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const [selectFiles, setSelectFiles] = useState<File[] | null>(null)
  
  const dispatch = useAppDispatch()

  const [viewAddBtn, setViewAddBtn] = useState<boolean>(true)
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0]
      if (!selectFiles) {
        setSelectFiles([newFile])
      } else {
        setSelectFiles([...selectFiles, newFile])
      }
    }
  }
  useEffect(() => {
    if (selectFiles) {
      const fileList = new DataTransfer()
      selectFiles?.forEach(file => fileList.items.add(file))
      setImages(fileList.files)
    }
    function view() {
      if (selectFiles && selectFiles.length > 4) {
        setViewAddBtn(false)
      } else {
        setViewAddBtn(true)
      }
    }
    view()
    setAddImageValid(selectFiles?.length! < 1 || selectFiles?.length === undefined)
  }, [selectFiles])

  

  const handleImgDelete = async (removeItem: string) => {
    if (selectFiles) {
      const newArr: File[] = selectFiles?.filter(item => item.name !== removeItem)
      setSelectFiles(newArr)
    }
  }

  return <div className='add-img'>
    <label htmlFor="add-img__section" style={{ cursor: 'pointer' }}>Добавте изображения</label>
    <div className='add-img__wrap'>
      {selectFiles?.map((file, index) => (
        <div key={index} className='add-img__card'>
          <img
            src={URL.createObjectURL(file)}
            alt={`Preview-${index}`}
          />
          <button className='add-img__del-btn' onClick={() => handleImgDelete(file.name)}>-</button>
        </div>
      ))}
      {
        viewAddBtn ?
          <button style={{ width: '100px', height: '100px', margin: '5px' }} onClick={() => inputFileRef.current?.click()}>+</button> : ''
      }
    </div>
    <input
      id='add-img'
      type="file"
      onChange={handleFileChange}
      ref={inputFileRef}
      hidden
    />
    {/* <button onClick={handleUpload} disabled={addImageValid}>Добавить изображения</button> */}
  </div>
}

export default AddImage