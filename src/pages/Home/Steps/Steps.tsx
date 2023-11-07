import { FC } from 'react'
import steps_bg1 from '../../../assets/service-img/Group23.png'
import steps_bg2 from '../../../assets/service-img/Group24.png'
import './Steps.scss'
import UContainer from '../../../component/utils/UContainer/UContainer'

const Steps: FC = () => {
  return <div className='steps'>
    <div className="steps__bg1">
      <img src={steps_bg1} alt="bg1" />
    </div>
    <div className="steps__bg2">
      <img src={steps_bg2} alt="bg2" />
    </div>
    <UContainer>
      <div className="steps__content">
        <p className="steps__title">ЗАКАЗАТЬ В 5 ШАГОВ</p>
        <div className="steps__wrap">
          <div className="steps__item">
            <div className="steps__img">
              <img src="" alt="" />
              <p className="steps__img">1</p>
            </div>
            <div className="steps__text">
              <p className="steps__text-green"></p>
              <p className="steps__text-black"></p>
            </div>
          </div>
          <div className="steps__item">
            <div className="steps__img">
              <img src="" alt="" />
              <p className="steps__img">1</p>
            </div>
            <div className="steps__text">
              <p className="steps__text-green"></p>
              <p className="steps__text-black"></p>
            </div>
          </div>
          <div className="steps__item">
            <div className="steps__img">
              <img src="" alt="" />
              <p className="steps__img">1</p>
            </div>
            <div className="steps__text">
              <p className="steps__text-green"></p>
              <p className="steps__text-black"></p>
            </div>
          </div>
          <div className="steps__item">
            <div className="steps__img">
              <img src="" alt="" />
              <p className="steps__img">1</p>
            </div>
            <div className="steps__text">
              <p className="steps__text-green"></p>
              <p className="steps__text-black"></p>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
}

export default Steps