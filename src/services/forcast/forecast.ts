import axios from 'axios'
export const getForecastWeather = async (lat:number = 13.76048, lon:number = 100.55563):Promise<any> => {
            const res = await axios.get(`${import.meta.env.VITE_BaseURL}/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OpenWeather_API_Key}`)
            return Promise.resolve(res.data.list)
}