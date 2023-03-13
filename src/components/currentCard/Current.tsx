import { useEffect, useState } from "react";
import { getCurrentWeather } from "../../services/current/Current";
import { Circles } from "react-loading-icons";
import {
  ICustom,
  IGeolocationCoordinates,
} from "../../services/current/interface";

import styles from "./current.module.css";

import VisionCard from "../visionCard/VisionCard";
import WindCard from "../windCard/WindCard";
import TempCard from "../tempCard/TempCard";

const Current = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ICustom>();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords as IGeolocationCoordinates;
      getCurrentWeather(latitude, longitude)
        .then(
          (data) => {       
            setData(data)     
          },
          (err) => {
            console.log("reject");
            console.log(err);
          }
        )
        .finally(() => setLoading(false));
    });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {loading ? (
          <Circles className={styles.loading} />
        ) : (
          <>
            { data ? 
              <>
                <TempCard city={data?.city} weather={data?.weather} main={data?.main} />
                <VisionCard vision={data?.visibility / 1000}/>
                <WindCard wind={data.wind}/>
                {/* <VisionCard vision={data?.visibility}/> */}
              </>
              : 
              <span>can't get data</span>
            }
          </>
        )}
      </div>
    </div>
    
  );
};

export default Current;
