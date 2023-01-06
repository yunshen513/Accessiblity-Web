import React from "react";
import Map from "./components/Map";
import './Page.css'

const Page = () => (
    <div className="layout_map">
        <div className="map_title">Page test</div>
        <div className="map_content">
            <Map />
        </div>
    </div>
);

export default Page;