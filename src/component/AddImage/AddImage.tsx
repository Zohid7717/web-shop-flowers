import { FC, ChangeEvent, useRef } from 'react'
import axios from '../../utils/axios'

type PropsType = {
  selectedFiles: File[]
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const AddImage: FC<PropsType> = ({ selectedFiles, setSelectedFiles }) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files)
      setSelectedFiles((prevFiles) => [...prevFiles, ...files])
    }
    console.log(selectedFiles)
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData()
      selectedFiles.forEach((file, index) => {
        formData.append(`image-${index}`, file)
      })
      const { data } = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      console.log(data.url)
    } catch (error) {
      console.log(error)
    }
  }

  return <div>
    <div>
      {selectedFiles.map((file, index) => (
        <img
          key={index}
          src={URL.createObjectURL(file)}
          alt={`Preview-${index}`}
          style={{ width: '100px', height: '100px', margin: '5px' }}
        />
      ))}
      <button style={{ width: '100px', height: '100px', margin: '5px' }} onClick={() => inputFileRef.current?.click()}>+</button>
    </div>
    <input
      type="file"
      onChange={handleFileChange}
      multiple
      ref={inputFileRef}
      hidden
    />
    <button onClick={handleUpload}>Добавить</button>
  </div>
}

export default AddImage