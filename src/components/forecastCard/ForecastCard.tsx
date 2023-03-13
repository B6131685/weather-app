import styles from "./forecast.module.css";
import { getForecastWeather } from "../../services/forcast/forecast";
import { useEffect, useState } from "react";
import { IGeolocationCoordinates } from "../../services/current/interface";
import * as echarts from "echarts";
import { getDay, Kelvin2celsius } from "../../Utils/utilss";
import { IParamsSpectial } from "../../services/forcast/interface";
import hotImage from '../../assets/images/hot.png'
import coolImage from '../../assets/images/winter.png'
import comfortImage from '../../assets/images/thermometer.png'
interface objforecast {
  time: string;
  temp: string;
}
const ForecastCard = () => {
  const [forecast, setForecast] = useState<objforecast[]>([]);
  let mintemp:number = 100;
  const option = {
    title: {
      show: true,
      text: "Forecast",
      textStyle: {
        fontSize: 30,
        color:'#CBE4DE'
      },
    },
    tooltip: {},
    dataset: [
      {
        source: forecast,
      },
    ],
    xAxis: {
      type: "category",
      axisLabel: {
        rotate: 50,
        formatter: function (value: string) {
          const date = new Date(value);
          return `${date.getHours()}.${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
        },
      },
    },
    yAxis: {
      axisLabel: {
        formatter: "{value} °C",
      },
      min: mintemp,
      // axisOffset: 100,
    },
    series: [
      {
        name: "test",
        smooth: true,
        type: "line",
        datasetIndex: 0,
        xAxisIndex: 0,
        yAxisIndex: 0,
        dimensions: ["time", "temp"],
        encode: {
          // tooltip:[0, 1]
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding:10,
          opacity: 1,
          borderWidth: 1,
          textStyle: {
            color: 'green',
            fontSize: 12,
          },
          formatter: function (params:IParamsSpectial, ticket:string, callback:(ticket: string, html: string)=> string | HTMLElement | HTMLElement[]) {
            let srcImage:any;
            if(Number(params.value.temp) > 29.50){
              srcImage = hotImage
            }else if(Number(params.value.temp) < 21){
              srcImage = coolImage
            }else{
              srcImage = comfortImage
            }
            const date = new Date(params.value.time);
            return `
              <div
              style="color:#000;display:flex;align-items: center;font-weight: 900;"
              ><span style="color:#000; font-size:2rem">${params.value.temp}</span> °C
              <img src="${srcImage}" width="30px" alt="Italian Trulli" style="margin-left:20px;">
              </div>
              <div style="color:#000;margin-top:10px;font-weight: 600;">
              ${date.getHours()}.${date
                .getMinutes()
                .toString()
                .padStart(2, "0")}
                ${getDay(date.getDay())}
                ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} 
              </div>
            `;
          }
        },
      },
    ],
  };
  useEffect(() => {
    let myChart = echarts.init(document.getElementById("chart") as HTMLElement);
    if (document.getElementById("chart")) {
      function resizeChart() {
        myChart?.resize();
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords as IGeolocationCoordinates;
          getForecastWeather(latitude, longitude).then(
            (data) => {
              let obj: Array<objforecast> = [];
              for (const iterator of data) {
                let temp = Kelvin2celsius(iterator.main.temp)
                // console.log(temp);
                
                if(Number(temp) < mintemp){ mintemp = Number(temp)};
                obj.push({
                  time: iterator.dt_txt,
                  temp: temp,
                });
              }
              setForecast([...obj]);
              option.yAxis.min = Math.floor(Math.min(mintemp) / 10) * 10;
              myChart.setOption(
                {
                  ...option,
                  dataset: [
                    {
                      source: obj,
                    },
                  ],
                },
                true
              );
            },
            (err) => {
              alert(err);
            }
          );
        });
      }
      myChart.setOption(option);
      window.addEventListener("resize", resizeChart);
    }

    return () => {
      if (myChart) {
        myChart?.dispose();
        window.removeEventListener("resize", () => myChart?.resize());
      }
    };
  }, []);

  return <div id="chart" className={styles.container}></div>;
};

export default ForecastCard;
