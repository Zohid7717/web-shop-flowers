import { FC, useEffect, useState } from 'react'
import CustomCheckbox from '../../../../../component/ui/customCheckbox/CustomCheckbox'
import { BouquetType } from '../../../../../service/redux/Slices/products/slise'
import { useAppDispatch, useAppSelector } from '../../../../../service/redux/hooks/hooks'
import { setProductItems } from '../../../../../service/redux/Slices/productItems/slice'
import './SortItems.scss'

const SortItems: FC = () => {
  const [productData, setProductData] = useState<BouquetType[]>([])
  const [productArr, setProductArr] = useState<string[]>([])
  const [items, setItems] = useState<string[]>([])
  const [showItems, setShowItems] = useState(8)

  const productItemsList = useAppSelector(state => state.productItems.value)

  const dispatch = useAppDispatch()

  dispatch(setProductItems(items))

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
  return <div className='sort-items'>
    {
      productItems.map((item, i) => (
        <CustomCheckbox key={i} name={item} setStateElement={setItems} stateElement={items} />
      ))
    }
    <p className='sort-items__show-more green'>Показать еще</p>
  </div>
}

export default SortItems