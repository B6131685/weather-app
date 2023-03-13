import Current from "./components/currentCard/Current";
import "./App.css";
import ForecastCard from "./components/forecastCard/ForecastCard";
import { useState } from "react";
import { IGeolocationCoordinates } from "./services/current/interface";
const access = { granted: true, denied: false, prompt: false };
function App() {
  const [permission, setPermission] = useState<boolean>();

  navigator.permissions
    .query({ name: "geolocation" })
    .then((permissionStatus) => {
      // console.log(`geolocation permission state is ${permissionStatus.state}`);
      setPermission(access[permissionStatus.state]);
      permissionStatus.onchange = () => {
        console.log(
          `geolocation permission state has changed to ${permissionStatus.state}`
        ); // granted | denied
        if (permissionStatus.state === "granted") {
          setPermission(access[permissionStatus.state]);
          navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords as IGeolocationCoordinates;
            console.log(latitude, longitude);
          });
        } else {
          setPermission(access[permissionStatus.state]);
        }
      };
    });

  return (
    <>
      {permission ? (
        <div className="layout">
          <div className="subcard">
              <Current />
              <ForecastCard />
          </div>
        </div>
      ) : (
        <div className="not_permison_layout">not permission location <br /> โปรดตั้งค่าการเข้าถึง  &#128549;</div>
      )}
    </>
  );
}

export default App;
