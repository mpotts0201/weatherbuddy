import {useEffect, useRef, useState} from "react";
import maplibregl, { Map as MapType } from "maplibre-gl";
import "./map.css";
import {useLocation} from "../../hooks";

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef<MapType | any>();

    const [zoom] = useState(14);
    const [API_KEY] = useState(process.env.REACT_APP_MAP_KEY);

    const {location, loading, error} = useLocation();

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
            new maplibregl.Marker({color: "#FF0000"}).setLngLat([lng, lat]).addTo(map.current);
        }
    });

    if (loading) return <div>LOADING...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
};

export default Map;
