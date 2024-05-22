'use client'
import dynamic from 'next/dynamic'
import { useMemo, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import BarChart from '@/components/BarChart'
import AmenityCart from '@/components/AmenityCart'
import Toggle from '@/components/Toggle'
import { useLeafletContext } from '@react-leaflet/core'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import Searchbar from '@/components/Searchbar'
import Image from 'next/image'
import amenitiesData from '../../../data/AmenityData'

export default function MyPage() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/Map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  // form values
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({
    lat: 14.6091,   
    lng: 121.0223
  })
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [lotSize, setLotSize] = useState('')
  const [floorArea, setFloorArea] = useState('')
  const [age, setAge] = useState('')
  const [image, setImage] = useState('')
  const [imageName, setImageName] = useState('')

  // amenities
  const [amenitySearchQuery, setAmenitySearchQuery] = useState('')
  const amenitiesArray = amenitiesData.map(amenity => ({
    amenity: amenity,
    qty: 0,
    isSelected: false
  }))
  const [amenities, setAmenities] = useState(amenitiesArray)

  // addresses
  const [searchQuery, setSearchQuery] = useState('')
  const [searchData, setSearchData] = useState([])

  const handleAddressChange = (e: any) => {
    setAddress(e.target.value);
  }
  
  // floods and earthquake states and functions
  const [floodChecked, setFloodChecked] = useState(false)
  const [earthquakeChecked, setEarthquakeChecked] = useState(false)

  function handleFloodChange() {
    setFloodChecked(!floodChecked)
  }

  function handleEarthquakeChange() {
    setEarthquakeChecked(!earthquakeChecked)
  }

  function uploadImage(e: any) {
    setImage(e.target.files[0])
    setImageName(e.target.files[0].name)
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    const data = new FormData()
    const selectedAmenities = []
    for (let i = 0; i < amenities.length; i++) {
      // console.log(amenities[i].isSelected)
      if (amenities[i].isSelected === true) {
        selectedAmenities.push(amenities[i])
      }
    }

    data.append('coords', JSON.stringify(coordinates))
    data.append('bedrooms', bedrooms)
    data.append('bathrooms', bathrooms)
    data.append('lotSize', lotSize)
    data.append('floorArea', floorArea)
    data.append('age', age)
    data.append('amenities', JSON.stringify(selectedAmenities))
    data.append('image', image)

    for (const value of data.values()) {
      console.log(value)
    }
    try {
      const url = ''
      const response = await fetch(url, {
        method: 'POST',
        body: data
      })
      if (response.ok) {
        // do something
      }
    }
    catch(err) {

    }

  }

  return (
    <div className="h-screen">
      <Navbar/>
      <div className="flex h-full">
        <div className="basis-1/4 px-4 overflow-y-scroll h-full">
          <form action="" method="" onSubmit={handleSubmit} className="" encType="multipart/form-data">
            <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchData={searchData} setSearchData={setSearchData} setCoordinates={setCoordinates}></Searchbar>
            <div className="flex mb-4 space-x-6">
              <div>
                <label className="font-semibold text-sm">Bedrooms</label>
                <input type="number" name="bedroom-count" id="bedroom-count" value={bedrooms} onChange={event => setBedrooms(event.target.value)} className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded p-1.5 w-32 mt-1 text-sm" min="1"></input>
              </div>
              <div>
                <label className="font-semibold text-sm">Bathrooms</label>
                <input type="number" name="bathroom-count" id="bathroom-count" value={bathrooms} onChange={event => setBathrooms(event.target.value)} className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded p-1.5 w-32 mt-1 text-sm" min="1"></input>
              </div>
            </div>
            <div className="flex mb-4 space-x-6">
              <div>
                <label className="font-semibold text-sm">Lot size (m<sup>2</sup>)</label>
                <input type="number" name="lot-size" id="lot-size" value={lotSize} onChange={event => setLotSize(event.target.value)} className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded p-1.5 w-32 mt-1 text-sm" min="1" step=".01"></input>
              </div>
              <div>
                <label className="font-semibold text-sm">Floor size (m<sup>2</sup>)</label>
                <input type="number" name="floor-size" id="floor-size" value={floorArea} onChange={event => setFloorArea(event.target.value)} className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded p-1.5 w-32 mt-1 text-sm" min="1" step=".01"></input>
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-sm">Age (yr)</label>
              <input type="number" value={age} onChange={event => setAge(event.target.value)} className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded p-1.5 w-28 mt-1 text-sm" min="0" step=".01"></input>
            </div>
            <div className="mb-4">
              {/* multiselect */}
              <label className="block font-semibold text-sm">Amenities</label>
              <AmenityCart searchQuery={amenitySearchQuery} setSearchQuery={setAmenitySearchQuery} amenities={amenities} setAmenities={setAmenities}/>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="mb-4">
                          <Image src="/upload.svg" width={40} height={40} alt="upload"></Image>
                        </div>
                        <p>{imageName}</p>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG or JPG (MAX SIZE 5MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={event => uploadImage(event)} />
                </label>
              </div> 
            </div>
            <div className="flex">
              <button className="text-white bg-neutral-400 hover:bg-neutral-500 focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2">Reset</button>
              <button type="submit" className="focus:outline-none text-white bg-emerald-600 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2">Calculate</button>
            </div>
          </form>
          <Toggle label="Floods" value={floodChecked} onChange={handleFloodChange}/>
          <Toggle label="Faultlines" value={earthquakeChecked} onChange={handleEarthquakeChange}/>
          <BarChart/>
        </div>
        <div className="basis-3/4">
          <Map coords={coordinates} setCoords={setCoordinates} setSearchQuery={setSearchQuery} floodChecked={floodChecked} earthquakeChecked={earthquakeChecked}/>
        </div>
      </div>
    </div>
  )
}
