import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const icon = L.icon({ 
  iconUrl: '/icons/marker-icon.png', 
  shadowUrl: '/icons/marker-shadow.png' 
})

const pos = {
  lat: 14.6091, 
  lng: 121.0223
}

const Map = () => {
  return (
    <MapContainer center={[pos.lat, pos.lng]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[pos.lat, pos.lng]} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map