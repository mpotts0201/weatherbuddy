import {useEffect, useState} from 'react'

const useLocation = () => {

    const [location, setLocation] = useState({lat: 0, lng: 0})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
    
    const success = (pos: any) => {
        var crd = pos.coords;
        
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        setLocation({lat: crd.latitude, lng: crd.longitude})
        setLoading(false)
    }
    
    const err = (err: any) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setError(err)
        setLoading(false)
    }
      
      
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, err, options);
          
    }, [])


    return {location, loading, error}

}

export default useLocation