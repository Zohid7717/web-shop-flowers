import { ProductItemsType } from '../redux/Slices/productItems/slice'
import { PriceType } from '../redux/Slices/productPrice/slice'
import { BouquetType } from '../redux/Slices/products/slice'

export const categoryPriceItems = async (data: BouquetType[], price: PriceType, items: ProductItemsType) => {
  const newArr1: BouquetType[] = []
  const newArr2: BouquetType[] = []
  const newArr: BouquetType[] = []
  data.forEach(element => {
    element.size.forEach(item => {
      if (!newArr1.includes(element) && item.price > price.value1 && item.price < price.value2) {
        newArr1.push(element)
      }
    })
    element.composition.forEach(el => {
      items.value.forEach(item => {
        if (!newArr2.includes(element) && el === item) {
          newArr2.push(element)
        }
      })
    })
  })
  newArr1.forEach(el => {
    newArr2.forEach(item => {
      if (el.id === item.id && !newArr.includes(item)) {
        newArr.push(item)
      }
    })
  })
  return newArr
}