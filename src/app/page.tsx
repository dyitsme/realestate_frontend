export default function Home() {
  return (
    <div>
      <h1>Enter property details</h1>
      <form action="" method="POST">
        <div className="">
          <label className="block">Number of bedrooms</label>
          <div className="">
            <input type="text" name="bedroom-count" id="bedroom-count" className="block" min="1"></input>
          </div>
        </div>
        <div className="">
          <label className="block">Number of bathrooms</label>
          <div className="">
            <input type="number" name="bathroom-count" id="bathroom-count" className="block" min="1"></input>
          </div>
        </div>
        <div className="">
          <label className="block">Address</label>
          <div className="">
            <input type="text" name="address" id="address" className="block"></input>
          </div>
        </div>
        <div className="">
          <label className="block">Lot size (sqm)</label>
          <div className="">
            <input type="number" name="lot-size" id="lot-size" className="block" min="1"></input>
          </div>
        </div>
        <div className="">
          <label className="block">Floor size (sqm)</label>
          <div className="">
            <input type="number" name="floor-size" id="floor-size" className="block" min="1"></input>
          </div>
        </div>
        <div className="">
          <label className="block">Age (yr)</label>
          <div className="">
            <input type="number" className="block" min="0"></input>
          </div>
        </div>
        <div className="">
          {/* multiselect */}
          <label className="block">Amenities</label>
          <div className="">
            <input type="text" className="block"></input>
          </div>
        </div>
      </form>
    </div>
  )
}
