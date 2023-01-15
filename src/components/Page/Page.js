import React, { useRef, useState } from "react";
import Map from "./components/Map";
import './Page.css'

const Page = () => {
    const [filters, setFilters] = useState(0)
    const selectedValue = useRef(0);

    return (
      <div className="layout_map">
        <div className="map_title">Map Type {filters}</div>
        <div className="map_control">
          <select onChange={(e) => (selectedValue.current = e.target.value)}>
            <option value={0}>All</option>
            <option value={1}>Accessibility > 1</option>
            <option value={3}>Accessibility > 3</option>
          </select>
          <button onClick={() => setFilters(selectedValue.current)}>
            Gimme the map
          </button>
        </div>
        <div className="map_content">
          <Map selectedFilters={filters} />
        </div>
      </div>
    );
};

export default Page;