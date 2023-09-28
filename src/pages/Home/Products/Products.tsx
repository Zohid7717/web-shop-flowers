import { FC, useState } from 'react'
import SortHead from './SortHead/SortHead'

const Products: FC = () => {
  const [showMore, setShowMore] = useState(9)
  
  return <div className='products'>
    <div className="products__main">
      <div className="products__main-head">
        <SortHead/>
      </div>
      <div className="products__main-list">

      </div>
    </div>
    <div className="products__sort"></div>
  </div>
}

export default Products