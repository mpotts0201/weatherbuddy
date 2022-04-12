import {RefObject, useEffect, useState} from 'react'
import axios from 'axios'

interface Props {
    lat: number,
    lng: number,
}

const useWeather = (props: Props) => {

    const {lat, lng} = props
    
    const [weather, setWeather] = useState<any>(null)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        const getWeather = async() => {
            try{
                if(lat != 0 && lng != 0){
                    const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,daily&appid=${process.env.REACT_APP_WEATHER_KEY}`)
                    setWeather(res.data)
                }

            }catch(err){
                setError(err)
                throw error
            }
        }

        getWeather()
    }, [lat, lng])

    return weather
}


export default useWeather