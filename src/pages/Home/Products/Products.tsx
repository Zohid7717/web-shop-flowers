import { FC, useEffect, useState } from 'react'
import SortHead from './SortHead/SortHead'
import { useAppDispatch, useAppSelector } from '../../../service/redux/hooks/hooks'
import { BouquetType, fetchBouquet, fetchBouquetFromCat, fetchBouquetFromName } from '../../../service/redux/Slices/products/slice'
import UContainer from '../../../component/utils/UContainer/UContainer'
import ProductCard from './ProductCard/ProductCard'
import ProductSort from './ProductSort/ProductSort'
import { showMore } from '../../../service/redux/Slices/displayLimit/slice'
import { motion } from 'framer-motion'

import './Products.scss'
import ProductCardSkeleton from '../../../component/Skeleton/ProductCard/ProductCardSkeleton'

const Products: FC = () => {
  const dispatch = useAppDispatch()
  const displayLimit: number = useAppSelector((state) => state.displayLimit.value)
  const categoryValue = useAppSelector(state => state.category.value)
  const inputValue = useAppSelector(state => state.inputValue.value)
  const { list, loading } = useAppSelector((state) => state.dataProducts)
  const productItems = useAppSelector(state => state.productItems.value)
  const [lastList, setLastList] = useState<BouquetType[]>([])

  //функция филтрации продуктов по цене
  // function sortByPrice(arr: BouquetType[]) {
  //   arr.forEach(item => {
  //     item.size.forEach(element => {
  //       if (element.price > sortPriceObj.value1 && element.price < sortPriceObj.value2 && !lastList.includes(item)) {
  //         setFilterList1([...filterList1, item])
  //       }
  //     })
  //   })
  // }

  //функция филтрации продуктов по содержанию продукта
  function sortByItems(arr1: BouquetType[], arr2: string[]) {
    let newArr: BouquetType[] = []
    arr1.forEach(element => {
      if (!newArr.includes(element)) {
        arr2.forEach(item => {
          element.composition.forEach(flo => {
            if (item === flo && !newArr.includes(element)) {
              newArr.push(element)
            }
          })
        })
      }
    })
    setLastList(newArr)
  }

  // const handleFilter = () => {
  //   if (sortPriceObj.value2 > 1) {
      // sortByPrice(list)
  //     if (productItems.length > 0) {
  //       sortByItems(filterList1, productItems)
  //     } else {
  //       setFilterList2(filterList1)
  //     }
  //   } else {
  //     if (productItems.length > 0) {
  //       sortByItems(list, productItems)
  //     } else {
  //       setFilterList2(list)
  //     }
  //   }
  //   console.log(filterList2)
  // }

  const handleShowMore = () => {
    dispatch(showMore())
  }
  const listVariants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      }
    }),
    hidden: { opacity: 0 }
  }

  useEffect(() => {
    dispatch(fetchBouquet())
    setLastList(list)
    console.log(lastList)
  }, [displayLimit, inputValue])
  const bouquet = lastList.map((item, i) => (
    <motion.div
      key={item.id}
      variants={listVariants}
      initial='hidden'
      animate='visible'
      custom={i}
    >
      <ProductCard {...item} />
    </motion.div>
  ))
  const skeleton = [...new Array(3)].map((_, i) => <ProductCardSkeleton key={i} />)
  return <div className='products'>
    <UContainer>
      <div className="products__wrap">
        <div className="products__main">
          <div className="products__main-head">
            <SortHead />
          </div>
          <div className="products__main-list">
            {loading === true ?
              skeleton :
              bouquet}
          </div>
          <button className='products__show-more green' onClick={() => handleShowMore()}>
            Показать еще
          </button>
        </div>
        <div className="products__sort">
          <ProductSort/>
        </div>
      </div>
    </UContainer>
  </div>
}

export default Products