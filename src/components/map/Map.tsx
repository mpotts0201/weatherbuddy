import {useEffect, useRef, useState} from "react";
import maplibregl, {Map as MapType} from "maplibre-gl";
import "./map.css";
import {useLocation, useWeather} from "../../hooks";

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef<MapType | any>();

    const [zoom] = useState(14);
    const [API_KEY] = useState(process.env.REACT_APP_MAP_KEY);

    const {location, loading, error} = useLocation();

    const weather = useWeather(location);
    console.log(weather);

    useEffect(() => {
        const {lat, lng} = location;
        if (map.current) return; //stops map from intializing more than once
        if (mapContainer?.current) {
            map.current = new maplibregl.Map({
                container: mapContainer.current,
                style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
                center: [lng, lat],
                zoom: zoom
            });
        }
        if (lat && lng && mapContainer?.current) {
            map.current.addControl(new maplibregl.NavigationControl({}), "top-right");
            // new maplibregl.Marker({color: "#FF0000"}).setLngLat([lng, lat]).addTo(map.current);
        }
    });

    useEffect(() => {
        // retrieve icon from weather api based on weather
        if (weather && location && map.current) {
            const {lat, lng} = location;

            console.log(weather.current.weather[0].icon);

            const coneEl = document.createElement("div");
            coneEl.className = "cone";

            const weatherEl = document.createElement("div");
            weatherEl.className = "weather";
            weatherEl.style.backgroundImage = `url(http://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png)`;
            coneEl.appendChild(weatherEl);

            const parentEl = document.createElement("div");

            parentEl.className = "marker";

            parentEl.appendChild(weatherEl);
            parentEl.appendChild(coneEl);

            new maplibregl.Marker(parentEl).setLngLat([lng, lat]).addTo(map.current);
        }
    }, [weather]);

    if (loading) return <div>LOADING...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
};

export default Map;
