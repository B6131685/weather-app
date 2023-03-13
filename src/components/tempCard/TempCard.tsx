import styles from "./temp.module.css";
import ImgWeather from "../imgWeather/ImgWeather";
import { Kelvin2celsius } from "../../Utils/utilss";
import { Main, mainWeather, Weather } from "../../services/current/interface";
type Props = {
  city: string;
  main: Main;
  weather: Weather;
};

const TempCard = ({ city, main, weather }: Props) => {
  return (
    <div className={`${styles.itemA} contents `}>
      <div className={`${styles.today}`}>NOW</div>
      <div className={styles.city}>{city}</div>
      <div className={styles.temp}>
        {main.temp ? (
          <span data-temp={Number(Kelvin2celsius(main.temp)) > 30 ? 
            "hot"
          : "" }>{Kelvin2celsius(main.temp || 0)} °c</span>
        ) : (
          <>Error</>
        )}
      </div>
      <div className={styles.mainWheather}>
        <span style={{ marginRight: "20px" }}>{weather?.description}</span>
        <ImgWeather weather={weather.main as mainWeather} />
      </div>
    </div>
  );
};

export default TempCard;
