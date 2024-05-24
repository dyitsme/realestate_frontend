import { useState } from 'react'
import amenitiesData from '../../data/AmenityData'

const AmenityCard = ({amenity, setAmenities}) => {
  const toggleAmenity = () => {
    setAmenities(prevAmenities => 
      prevAmenities.map(item => 
        item.amenity === amenity.amenity ? { ...item, isSelected: !item.isSelected } : item
      )
    )
  }

  const updateQty = (qty) => {
    setAmenities(prevAmenities => 
      prevAmenities.map(item => 
        item.amenity === amenity.amenity ? { ...item, qty: qty } : item
      )
    )
  }

  return (
    <div className="flex justify-between bg-gray-100 my-2 p-2 rounded-sm">
      <label className="flex items-center">
        <input type="checkbox" className="amenity-checkbox m-2" checked={amenity.isSelected} onChange={toggleAmenity}></input>
        <p className="text-sm">{amenity.amenity}</p>
      </label>
      <input type="number" value={amenity.qty} onChange={event => updateQty(event.target.value)} disabled={!amenity.isSelected} className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-neutral-600 rounded-md p-1.5 max-w-12 mt-1 text-sm"></input>
    </div>
  )
}

const AmenitySearch = ({searchQuery, setSearchQuery}) => {  
  return(
    <div>
      <input type="text" name="amenity" id="amenity" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-neutral-700 rounded w-full p-1.5 mt-1 text-sm"></input>
    </div>
  )
}

const AmenityCart = ({searchQuery, setSearchQuery, amenities, setAmenities}) => {
  return (
    <div>
      <AmenitySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div className="max-h-52 overflow-y-auto mt-2 border border-neutral-400 rounded p-2">
        {amenities.filter((amenity) =>
          amenity.amenity.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((amenity, index) => (
          <AmenityCard amenity={amenity} setAmenities={setAmenities} />
        ))}
      </div>
    </div>
  )
}

export default AmenityCart