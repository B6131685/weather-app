import axios from 'axios'
import { ICustom, IGeolocationCoordinates, Main, Weather, Wind } from './interface'
export const getCurrentWeather = async (latitude:number, longitude:number): Promise<ICustom> => {

    // navigator.geolocation.getCurrentPosition( async ({ coords }) => {
        // const { latitude, longitude } = coords as IGeolocationCoordinates;
        const res = await axios.get(`${import.meta.env.VITE_BaseURL}/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OpenWeather_API_Key}`)
        if(res.status === 200){ 

            const { data } = res;
            // console.log(data);
            
            const obj = {
                wind: data.wind,
                visibility: data.visibility,
                city: data.name,
                main: data.main,
                weather: data.weather[0]
            }
            return Promise.resolve(obj);
        }
        
        return Promise.reject('Error Status:'+ res.status)
    // })
}

