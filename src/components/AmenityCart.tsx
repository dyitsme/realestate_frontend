import { useState } from 'react'
import amenitiesData from '../../data/AmenityData'

const AmenityCard = ({ amenity, setAmenities }) => {
  const toggleAmenity = () => {
    setAmenities(prevAmenities =>
      prevAmenities.map(item => {
        // item.amenity === amenity.amenity ? { ...item, isSelected: !item.isSelected, qty: !item.isSelected ? 1 : 0 } : item
        if (item.amenity === amenity.amenity) {
          const isSelected = !item.isSelected
          const qty = isSelected ? 1 : 0
          return { ...item, isSelected, qty }
        }
        return item
      })
    )
  }

  const updateQty = (qty) => {
    const updatedQty = Math.max(amenity.isSelected ? 1 : 0, qty);
    setAmenities(prevAmenities =>
      prevAmenities.map(item =>
        item.amenity === amenity.amenity ? { ...item, qty: updatedQty } : item
      )
    )
  }

  return (
    <div className="flex justify-between bg-neutral-100 my-2 p-2 rounded-sm">
      <label className="flex items-center">
        <input type="checkbox" className="amenity-checkbox m-2" checked={amenity.isSelected} onChange={toggleAmenity}></input>
        <p className="text-sm text-neutral-700">{amenity.amenity}</p>
      </label>
      {/* <input
        type="number"
        value={amenity.qty}
        onChange={event => updateQty(Number(event.target.value))}
        disabled={!amenity.isSelected}
        className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-neutral-600 rounded-md p-1.5 max-w-12 mt-1 text-sm"
        min={amenity.isSelected ? 1 : 0}
      ></input> */}
    </div>
  )
}

const AmenitySearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div>
      <input type="text" name="amenity" id="amenity" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-neutral-700 rounded w-full p-1.5 mt-1 text-sm" placeholder="Search..."></input>
    </div>
  )
}

const AmenityCart = ({ searchQuery, setSearchQuery, amenities, setAmenities }) => {
  function isSelected(amenity) {
    if (amenity.isSelected) {
      return amenity
    }
  }
  return (
    <div className="grid grid-col-1 gap-2">
      <AmenitySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <p>{ amenities.filter(isSelected).length } amenities selected </p>
      <div className="max-h-52 overflow-y-auto mt-2 border border-neutral-400 rounded p-2">
        {amenities.filter((amenity) =>
          amenity.amenity.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((amenity, index) => (
          <AmenityCard key={index} amenity={amenity} setAmenities={setAmenities} />
        ))}
      </div>
    </div>
  )
}

export default AmenityCart
