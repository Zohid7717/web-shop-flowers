import { FC, useEffect, useState } from 'react'
import CustomCheckbox from '../../../../../component/ui/customCheckbox/CustomCheckbox'
import { BouquetType } from '../../../../../service/redux/Slices/products/slise'
import { useAppDispatch, useAppSelector } from '../../../../../service/redux/hooks/hooks'
import { removeProductItems, setProductItems } from '../../../../../service/redux/Slices/productItems/slice'

const SortItems: FC = () => {
  const [productData, setProductData] = useState<BouquetType[]>([])
  const productItems: string[] = []
  const [items, setItems] = useState('')

  const productItemsList = useAppSelector(state => state.productItems)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (productItemsList.includes(items)) {
      dispatch(removeProductItems(items))
    } else{
      dispatch(setProductItems(items))
    }
    
  }, [items])

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
  console.log(productItemsList)
  return <div className='sort-items'>
    {
      productItems.map((item, i) => (
        <CustomCheckbox key={i} name={item} setStateElement={setItems} />
      ))
    }
  </div>
}

export default SortItems