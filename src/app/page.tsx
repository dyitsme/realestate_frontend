import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <h1 className="text-2xl">Enter property details</h1>
      <form action="" method="POST">
        <div className="">
          <label className="block">Number of bedrooms</label>
          <input type="text" name="bedroom-count" id="bedroom-count" className="block border border-gray-900 rounded" min="1"></input>
        </div>
        <div className="">
          <label className="block">Number of bathrooms</label>
          <input type="number" name="bathroom-count" id="bathroom-count" className="block border border-gray-900 rounded" min="1"></input>
        </div>
        <div className="">
          <label className="block">Address</label>
          <input type="text" name="address" id="address" className="block border border-gray-900 rounded"></input>
        </div>
        <div className="">
          <label className="block">Lot size (sqm)</label>
          <input type="number" name="lot-size" id="lot-size" className="block border border-gray-900 rounded" min="1"></input>
        </div>
        <div className="">
          <label className="block">Floor size (sqm)</label>
          <input type="number" name="floor-size" id="floor-size" className="block border border-gray-900 rounded" min="1"></input>
        </div>
        <div className="">
          <label className="block">Age (yr)</label>
          <input type="number" className="block border border-gray-900 rounded" min="0"></input>
        </div>
        <div className="">
          {/* multiselect */}
          <label className="block">Amenities</label>
          <div className="">
            <input type="text" className="block border border-gray-900 rounded"></input>
          </div>
        </div>
        <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Calculate</button>
      </form>
    </div>
  )
}
