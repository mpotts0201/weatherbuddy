import {RefObject, useEffect, useState} from 'react'
import {useWeather} from '../../hooks'

interface Props {
    lat: number,
    lng: number,
    ref: RefObject<HTMLDivElement>
}

const WeatherMarker = (props: Props) => {

    const {lat, lng, ref} = props;

    const weather = useWeather({lat, lng});


    return (
        <div>

        </div>
        );

}


export default WeatherMarker