'use client'
import dynamic from 'next/dynamic'
import { useMemo, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import MultiSelect from '@/components/Multiselect'
import BarChart from '@/components/BarChart'
import Toggle from '@/components/Toggle'
import { useLeafletContext } from '@react-leaflet/core'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import { Data } from '@/utils/Data'

export default function MyPage() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/Map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])
  
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({
    lat: 14.6091, 
    lng: 121.0223
  })

  const handleAddressChange = (e: any) => {
    setAddress(e.target.value);
  }
  
  const [chartData, setChartData] = useState({

  })

  // floods and earthquake states and functions
  const [floodChecked, setFloodChecked] = useState(false)
  const [earthquakeChecked, setEarthquakeChecked] = useState(false)

  function handleFloodChange() {
    setFloodChecked(!floodChecked)
  }

  function handleEarthquakeChange() {
    setEarthquakeChecked(!earthquakeChecked)
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    const url = `http://localhost:3000/api/search/${address}`
    const response = await fetch(url)
    const json = await response.json()
    const newCoordinates = await json.addresses.results[0].geometry.location
    // console.log("hello")
    setNewMarker(newCoordinates)
  }

  function setNewMarker(newCoordinates: any) {
    // const map = useMap()
    setCoordinates({ lat: newCoordinates.lat, lng: newCoordinates.lng })
    // map.panTo({ lat: newCoordinates.lat, lng: newCoordinates.lng })
  }


  return (
    <div className="h-screen">
      <Navbar/>
      <div className="flex h-full">
        <div className="basis-1/4 px-4 overflow-y-scroll h-full">
          <form action="" method="" onSubmit={handleSubmit} className="" encType="multipart/form-data">
            <div className="my-4">
              <label className="font-semibold">Address</label>
              <input onChange={handleAddressChange} type="text" name="address" id="address" className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded w-full p-1.5 mt-1"></input>
            </div>
            <div className="flex mb-4 space-x-6">
              <div>
                <label className="font-semibold">Bedrooms</label>
                <input type="number" name="bedroom-count" id="bedroom-count" className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded p-1.5 w-32 mt-1" min="1"></input>
              </div>
              <div>
                <label className="font-semibold">Bathrooms</label>
                <input type="number" name="bathroom-count" id="bathroom-count" className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded p-1.5 w-32 mt-1" min="1"></input>
              </div>
            </div>
            <div className="flex mb-4 space-x-6">
              <div>
                <label className="font-semibold">Lot size (m<sup>2</sup>)</label>
                <input type="number" name="lot-size" id="lot-size" className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded p-1.5 w-32 mt-1" min="1"></input>
              </div>
              <div>
                <label className="font-semibold">Floor size (m<sup>2</sup>)</label>
                <input type="number" name="floor-size" id="floor-size" className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded p-1.5 w-32 mt-1" min="1"></input>
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Age (yr)</label>
              <input type="number" className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded p-1.5 w-28 mt-1" min="0"></input>
            </div>
            <div className="mb-4">
              {/* multiselect */}
              <label className="block font-semibold">Amenities</label>
              <MultiSelect></MultiSelect>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG or JPG (MAX SIZE 5MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
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
          <BarChart></BarChart>
        </div>
        <div className="basis-3/4">
          <div className="flex bg-zinc-200 justify-around py-2">
            <div className="text-center bg-white p-2 w-44 rounded">
              <p className="text-sm">Estimated Price</p>
              <p className="text-xl">PHP 3200000</p>
            </div>
            <div className="text-center bg-white p-2 w-44 rounded">
              <p className="text-sm">Safety</p>
              <p className="text-xl">3.3/5</p>
            </div>
            <div className="text-center bg-white p-2 w-44 rounded">
              <p className="text-sm">Nearby amenities</p>
              <p className="text-xl">10</p>
            </div>
          </div>
          <Map coords={coordinates} floodChecked={floodChecked}/>
        </div>
      </div>
    </div>
  )
}
