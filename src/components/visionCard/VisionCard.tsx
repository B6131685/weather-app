import React from "react";
import visionImg from "../../assets/images/eye.png";
import styles from "./vision.module.css";
type Props = {
  vision: number | undefined;
};

const VisionCard = ({ vision = 0 }: Props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.contents} contents`}>
        <img src={visionImg} style={{ width: "40px" }} alt="vision" />
        <div className={`${styles.text}`}>{vision} km.</div>
      </div>
    </div>
  );
};

export default VisionCard;
