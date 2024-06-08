import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, GeoJSON, useMapEvents, LayersControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState, useEffect, useRef } from 'react'
import MetroManila5yrFloodData from '../../data/MetroManila5yrFlood.json'
import MetroManila25yrFloodData from '../../data/MetroManila25yrFlood.json'
import faultlineData from '../../data/MetroManilaFaultline.json'


const icon = L.icon({ 
  iconUrl: '/icons/marker-icon.png',
  shadowUrl: '/icons/marker-shadow.png' ,
  iconSize: [24, 36],
  iconAnchor: [12,36]
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

const FloodLayer = ({data}) => {
  return (
    <GeoJSON data={data} style={floodStyle}></GeoJSON>
  )
}

const FaultlineLayer = ({data}) => {
  return (
    <GeoJSON data={data} style={faultlineStyle}></GeoJSON>
  )
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


const FloodInfoLegend = ({map}) => {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: 'bottomleft' })
      legend.onAdd = () => {
        let div = L.DomUtil.create('div', 'info legend')
        let grades = ['Low', 'Medium', 'High']
        let labels = []

        div.innerHTML += '<h4>Flood Hazard</h4>'
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

// once a marker has been created by clicking onto the map, it should update the latlng state
// address search bar should contain the latlng of the newly created marker
const LocationMarker = ({searchedCoords, setCoords, setSearchQuery, resetSearchResult }) => {
  const map = useMapEvents({
    click(e) {
      // update coordinate position and search query from main page
      setCoords({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      })
      setSearchQuery(`${e.latlng.lat}, ${e.latlng.lng}`)
      map.flyTo(e.latlng, map.getZoom())
	  resetSearchResult();
      // console.log(e.latlng.lat)
    }
  })

  return (
    <Marker position={searchedCoords} icon={icon}>
      <Popup>You are here</Popup>
    </Marker>
  )
}


const Map = ({coords, setCoords, setSearchQuery, resetSearchResult}) => {
  const [map, setMap] = useState(null)
  useEffect(() => {
    if (map) {
      map.flyTo({ lat: coords.lat, lng: coords.lng }, map.getZoom())
    }
  }, [coords, map])


  return (
    <MapContainer center={[coords.lat, coords.lng]} zoom={15} scrollWheelZoom={true} ref={setMap}>
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      {/* <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
      /> */}
      {/* <TileLayer
        attribution=' &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png "
      />
      <LocationMarker searchedCoords={coords} setCoords={setCoords} setSearchQuery={setSearchQuery} resetSearchResult={resetSearchResult}/>
      <Circle center={[coords.lat, coords.lng]} fillColor="blue" radius={1000}></Circle>
      <LayersControl position="bottomright">
        <LayersControl.Overlay name="5-year Floods">
          <FloodLayer data={MetroManila5yrFloodData}></FloodLayer>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="25-year Floods">
          <FloodLayer data={MetroManila25yrFloodData}></FloodLayer>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Faultlines">
          <FaultlineLayer data={faultlineData}></FaultlineLayer>
        </LayersControl.Overlay>
      </LayersControl>
      <FloodInfoLegend map={map} />
    </MapContainer>
  )
}

export default Map