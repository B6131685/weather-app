import React from "react";
import windImage from "../../assets/images/wind.png";
import { Wind } from "../../services/current/interface";
import styles from "./wind.module.css";
type Props = {
  wind:Wind
};

const WindCard = ({wind}: Props) => {
  console.log(wind);
  
  return (
    <div className={`${styles.container}`}>
      <div className={`contents ${styles.contents}`}>
        <img src={windImage} style={{ width: "40px" }} alt="vision" />
        <div className={`${styles.text}`}>{wind.speed}</div>
      </div>
    </div>
  );
};

export default WindCard;
