import { FC, useEffect, useState } from 'react'
import CustomCheckbox from '../../../../../component/ui/customCheckbox/CustomCheckbox'
import { BouquetType } from '../../../../../service/redux/Slices/products/slise'

const SortItems: FC = () => {
  const [productData, setProductData] = useState<BouquetType[]>([])
  const productItems: string[] = []

  useEffect(() => {
    const productList = async function () {
      const response = await fetch("http://localhost:3001/bouquets")
      try {
        await response.json()
          .then(data => {
            setProductData(data)
          })
      } catch (error) {
        console.log(error)
      }
    }
    productList()
  }, [])
  productData.forEach(element => {
    element.composition.forEach(element => {
      if (!productItems.includes(element)) {
        productItems.push(element)
      }
    })
  });
  console.log(productItems)
  return <div className='sort-items'>
    {
      productItems.map((item, i) => (
        <CustomCheckbox key={i} name={item} />
      ))
    }
  </div>
}

export default SortItems