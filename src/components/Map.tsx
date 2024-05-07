import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useLeafletContext } from '@react-leaflet/core'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState, useEffect, useRef } from 'react'


const icon = L.icon({ 
  iconUrl: '/icons/marker-icon.png',
  shadowUrl: '/icons/marker-shadow.png' 
})


const Map = ({coords}) => {
  // const map = useMap()
  // useEffect(() => {
  //   if (map) {
  //     map.flyTo({ lat: coords.lat, lng: coords.lng })
  //   }
  // }, [coords, map])
  const [map, setMap] = useState(null)
  useEffect(() => {
    if (map) {
      map.flyTo({ lat: coords.lat, lng: coords.lng })
    }
  }, [coords, map])

  return (
    <MapContainer center={[coords.lat, coords.lng]} zoom={13} scrollWheelZoom={true} ref={setMap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.lat, coords.lng]} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map