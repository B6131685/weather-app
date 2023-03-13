import { mainWeather } from "../../services/current/interface";
import sun from '../../assets/images/sun.png'
import moon from '../../assets/images/moon.png'

import clouds from '../../assets/images/clouds.png'
import storm from '../../assets/images/storm.png'
import raining from '../../assets/images/raining.png'
import './weather.module.css'
type Props = {
  weather:mainWeather
}

const ImgWeather = ( {weather}: Props) => {
  
    switch (weather) {
      case "Clouds":
        return <img src={clouds} alt="clouds.png"/>  
      case "Thunderstorm":
        return <img src={storm} alt="clouds.png"/>  
      case "Rain":
        return <img src={raining} alt="clouds.png"/>   
      case "Clear":
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 18) {
          return <img src={sun} alt="clouds.png"/>  
        } else {
          return <img src={moon} alt="clouds.png"/>  
        }
      default:
        return <img src={sun} alt="clouds.png"/>  
      }
}
  

export default ImgWeather