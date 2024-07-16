import React, { useEffect, useRef } from "react";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import dataSource from "./suburb-data.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoieXVuc2hlbjUxMyIsImEiOiJjbGNrYWpudHAzMjdvM3FwNDc2Y3JoOGxiIn0.aRCWmrFlMnX-IfvMk3lrbw";

const Map = ({ selectedFilters }) => {
  const map = useRef(null);
  const mapContainer = useRef(null);

  const rawData = dataSource.features;
  console.log(rawData)

  useEffect(() => {

    //initiate the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [144.9631, -37.8136],
      zoom: 10,
      style: "mapbox://styles/mapbox/streets-v12",
    });

    map.current.on("load", () => {
      map.current.on("click", (e) => {
          const features = map.current.queryRenderedFeatures(
              e.point,
              {
                  layers: [
                      "poi-label",
                      "transit-label",
                      "landuse",
                      "national-park",
                  ],
              }
          );

          console.log(features)
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(features[0].properties.name)
              .addTo(map.current);
      });
      //filter data
      const data = {
        type: "FeatureCollection",
        features: rawData.filter(
          (item) => item.properties.AREASQKM21 >= selectedFilters
        ),
      };
      console.log(data);

      const layers = map.current.getStyle().layers;
      // Find the index of the first symbol layer in the map style.
      let firstSymbolId;
      for (const layer of layers) {
        if (layer.type === "symbol") {
          firstSymbolId = layer.id;
          break;
        }
      }

      //define data source
      map.current.addSource("suburb-data", {
        type: "geojson",
        data: data,
      });

      //style map using dataset
      map.current.addLayer(
        {
          id: "suburbs",
          source: "suburb-data",
          type: "fill",
          paint: {
            "fill-color": [
              "step",
              ["get", "AREASQKM21"],
              "#feda76",
              0.5,
              "#feb24d",
              1,
              "#fd8b3a",
              2,
              "#fc4f2c",
              3,
              "#e41b1e",
              4,
              "#bd0026",
              6,
              "#88021d",
              8,
              "#5a0214",
            ],
            "fill-opacity": 0.6,
            "fill-outline-color": "#FFF",
          },
        },
        firstSymbolId
      );
    });
  });

  return <div ref={mapContainer} className="map-container"></div>;
};

export default Map;
