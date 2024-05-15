import { useState } from 'react'

let queryTimeout = null
const Searchbar = ({searchQuery, setSearchQuery, searchData, setSearchData, setCoordinates}) => {

  let searchValue

  function handleSearch(e) {
    handleSearchChange(e.target.value)
    search()
  }

  function handleSearchChange(value) {
    searchValue = value
    setSearchQuery(searchValue)
  }

  // pins the location and updates the selected result
  function handleSelectedResult(result) {
    // lat and lng
    // in geojson, the format is lng and lat, so had to reverse the ordering
    setCoordinates({lat: result.geometry.coordinates[1], lng: result.geometry.coordinates[0]})
    setSearchQuery(result.properties.name)
    clearSearchResults()
  }

  function clearSearchResults() {
    console.log('Cleared results')
    setSearchData([])
  }

  function search () {
    if (queryTimeout !== null) {
      clearTimeout(queryTimeout)
    }
    // console.log("searchQuery: ", searchQuery)
    // console.log("searchValue: ", searchValue)
    queryTimeout = setTimeout(async () => {
      if (searchValue !== '') {
        const url = `http://localhost:3000/api/search/${searchValue}`
        const response = await fetch(url)
        const json = await response.json()
        console.log(url)
        console.log(json.addresses.features)
        
        setSearchData(json.addresses.features)
      } 
    }, 500)
    
  }


  return (
    <div className="my-4 relative">
      <label className="font-semibold text-sm">Address</label>
      <input value={searchQuery} onChange={handleSearch} onFocus={handleSearch} onBlur={clearSearchResults} type="text" name="address" id="address" className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-sky-600 rounded w-full p-1.5 mt-1 text-sm"></input>
      {/* dropdown */}
      <div className="z-10 absolute mt-2 w-full bg-white shadow-md rounded-md">
      {/* dropdown results */}
        {searchData.map((result, index) => (
          <div className="text-sm hover:bg-neutral-200 cursor-pointer p-2" key={index} onClick={() => handleSelectedResult(result)}>
            <div className="font-medium">
              {result.properties.name}
            </div>
            <div>
              {result.properties.street}, {result.properties.city}, {result.properties.country}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Searchbar