import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, GeoJSON } from 'react-leaflet'
import { useLeafletContext } from '@react-leaflet/core'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState, useEffect, useRef } from 'react'
import floodData from '../../data/MetroManila5yrFlood.json'
import faultlineData from '../../data/MetroManilaFaultline.json'


const icon = L.icon({ 
  iconUrl: '/icons/marker-icon.png',
  shadowUrl: '/icons/marker-shadow.png' 
})

// const colors = {
//   low: '#FACC15',
//   medium: '#FB923C',
//   high: '#DC2626'
// }

const colors = {
  low: '#6ED3E1',
  medium: '#0492C2',
  high: '#1520A6'
}

// const colors = {
//   low: '#D8B9EC',
//   medium: '#917AF8',
//   high: '#3D46D7'
// }

const { low, medium, high } = colors

const floodStyle = (feature) => {
  switch (feature.properties.Var) {
    case 1.0: return {color: low}
    case 2.0: return {color: medium}
    case 3.0: return {color: high}
  }
}

const faultlineStyle = {
  color: "sienna",
  weight: 7
}

const FloodLayer = ({floodChecked}) => {
  if (floodChecked) {
    return (
      <GeoJSON data={floodData} style={floodStyle}></GeoJSON>
    )
  }
    console.log('flood is toggled on')
}

const FaultlineLayer = ({earthquakeChecked}) => {
  if (earthquakeChecked) {
    return (
      <GeoJSON data={faultlineData} style={faultlineStyle}></GeoJSON>
    )
  }
}


function getColor(hazard) {
  if (hazard === 'Low') {
    return low
  }
  else if (hazard === 'Medium') {
    return medium
  }
  else if (hazard == 'High') {
    return high
  }
}

const Legend = ({map, floodChecked}) => {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "topright" })

      legend.onAdd = () => {
        let div = L.DomUtil.create('div', 'info legend')
        let grades = ['Low', 'Medium', 'High']
        let labels = []

        div.innerHTML += '<h4>Flood risk</h4>'
        for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
              `<div class="flex-container">
                <div style="background: ${getColor(grades[i])}"></div>
                <span>${grades[i]}</span>
              </div>`
        }
  
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

const Map = ({coords, floodChecked, earthquakeChecked}) => {
  const [map, setMap] = useState(null)
  useEffect(() => {
    if (map) {
      map.flyTo({ lat: coords.lat, lng: coords.lng })
    }
  }, [coords, map])

  return (
    <MapContainer center={[coords.lat, coords.lng]} zoom={15} scrollWheelZoom={true} ref={setMap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.lat, coords.lng]} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Circle center={[coords.lat, coords.lng]} fillColor="blue" radius={1000}></Circle>
      <FloodLayer floodChecked={floodChecked}></FloodLayer>
      <FaultlineLayer earthquakeChecked={earthquakeChecked}></FaultlineLayer>
      <Legend map={map} floodChecked={floodChecked}/>
    </MapContainer>
  )
}

export default Map