import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../service/redux/hooks/hooks';
import CardBouquetImg from './CardBouquetImg/CardBouquetImg';

import "./CardBouquet.scss";
import { setBouquetState } from '../../service/redux/Slices/bouquet/slice';

const CardBouquet: FC = () => {
  const bouquet = useAppSelector(state=>state.bouquet.list)
  
  return <div>
    <CardBouquetImg />
    
    CardBouquet
  </div>
}

export default CardBouquet