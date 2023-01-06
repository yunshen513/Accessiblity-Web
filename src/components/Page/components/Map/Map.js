import React, { useRef, useEffect, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoieXVuc2hlbjUxMyIsImEiOiJjbGNrYWpudHAzMjdvM3FwNDc2Y3JoOGxiIn0.aRCWmrFlMnX-IfvMk3lrbw';

const Map = () => {
        const mapContainer = useRef(null);
        const map = useRef(null);
        const [lng, setLng] = useState(-79.999732);
        const [lat, setLat] = useState(40.4374);
        const [zoom, setZoom] = useState(11);

        useEffect(() => {
            if (map.current) return; // initialize map only once

            map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [lng, lat],
            zoom: zoom
            });
        });

        return (
            <div>
            <div ref={mapContainer} className="map-container" />
            </div>
        );
}

export default Map;