import { FC } from 'react'
import { Link } from 'react-router-dom'

type ProductCardType = {
  id: any,
  name: string,
  size: {
    size_name: string,
    price: number
  }[],
  image: string
}

const ProductCard: FC<ProductCardType> = ({ id, name, size, image }) => {
  return <div className='product-card'>
    <div className="product-card__img">
      <Link to={`FullCardPage/${id}`}>
        <img src={image} alt={name} />
      </Link>
    </div>
    <div className="product-card__content">
      <p className="product-card__name">{name}</p>
      <p className="product-card__price">
        <span product-card__price-num>{size[0].price}</span>
        <span product-card__price-text>руб.</span>
      </p>
      <button className='product-card__cart'>В корзину</button>
    </div>
  </div>
}

export default ProductCard