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


const floodStyle = (feature) => {
  switch (feature.properties.Var) {
    case 1.0: return {color: "#FACC15"}
    case 2.0: return {color: "#FB923C"}
    case 3.0: return {color: "#DC2626"}
  }
}

const faultlineStyle = {
  color: "blue",
  weight: 10
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
    </MapContainer>
  )
}

export default Map