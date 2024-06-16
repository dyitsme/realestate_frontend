import { useState, useEffect, useRef } from 'react';

const Address = ({ street, city, country }) => {
  const addressParts = [street, city, country].filter(part => part); // Filters out falsy values (null, undefined, empty strings)
  const formattedAddress = addressParts.join(', ');

  return (
    <div>
      <p>{formattedAddress}</p>
    </div>
  );
};



const Searchbar = ({ searchQuery, setSearchQuery, searchData, setSearchData, setCoordinates, setCity, error }) => {
  let searchValue;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchbarRef = useRef(null);
  const queryTimeout = useRef(null); // Use useRef to define queryTimeout

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchbarRef]);

  useEffect(() => {
    // This ensures that isDropdownVisible is false initially, and changes only after the component mounts
    setIsDropdownVisible(false);
  }, []);

  function formatAddress(name, street, city, country) {
    const addressParts = [name, street, city, country].filter(part => part); // Filters out falsy values (null, undefined, empty strings)
    const formattedAddress = addressParts.join(', ');
    return formattedAddress;
  }

  function handleSearch(e) {
    handleSearchChange(e.target.value);
    search();
  }

  function handleSearchChange(value) {
    searchValue = value;
    setSearchQuery(searchValue);
    setIsDropdownVisible(true); // Show dropdown on input change
  }

  function handleSelectedResult(result) {
    setCoordinates({ lat: result.geometry.coordinates[1], lng: result.geometry.coordinates[0] });
    setSearchQuery(formatAddress(result.properties.name, result.properties.street, result.properties.city, result.properties.country));
    // if the user searches for a city, set the city name
    if (result.properties.type === 'city') {
      setCity(result.properties.name)
    }
    else {
      setCity(result.properties.city);
    }
    clearSearchResults();
    setIsDropdownVisible(false); // Hide dropdown on selection
  }

  function clearSearchResults() {
    console.log('Cleared results');
    setSearchData([]);
  }

  function search() {
    if (queryTimeout.current !== null) {
      clearTimeout(queryTimeout.current);
    }
    queryTimeout.current = setTimeout(async () => {
      if (searchValue !== '') {
        const url = `/api/search/${searchValue}`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(url);
        console.log(json.addresses.features);

        setSearchData(json.addresses.features);
      }
    }, 500);
  }

  function handleFocus() {
    if (searchQuery !== '') {
      setIsDropdownVisible(true); // Show dropdown on input focus if there is a query
    }
  }

  return (
    <div className="my-2 relative">
      <label className="font-semibold text-sm">Location</label>
      <div className="" ref={searchbarRef}>
        <input
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleFocus} // Add onFocus event
          type="text"
          name="address"
          id="address"
          className="block border border-neutral-400 focus:outline-none focus:outline-offset-[-1px] focus:outline-neutral-700 rounded w-full p-1.5 mt-1 text-sm"
          placeholder="Search..."
        />
        {error && <p className="text-red-500 text-xs">This field is required.</p>}
        {isDropdownVisible && searchData.length > 0 && (
          <div className="z-10 absolute mt-2 w-full bg-white shadow-md rounded-md">
            {searchData.map((result, index) => (
              <div
                className="text-sm hover:bg-neutral-200 cursor-pointer p-2"
                key={index}
                onClick={() => handleSelectedResult(result)}
              >
                <div className="font-medium">
                  {result.properties.name}
                </div>
                <div>
                  <Address street={result.properties.street} city={result.properties.city} country={result.properties.country} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
