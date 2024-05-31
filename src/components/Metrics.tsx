const Metrics = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex flex-col items-center border border-gray-400 rounded">
        <h2 className="">Estimated price</h2>
        <p className="text-2xl">P3.2M</p>
      </div>
      <div className="grid grid-cols-2">
        <label>Safety</label>
        <p className="text-right">3.3/5</p>
        <label>Nearby amenities</label>
        <p className="text-right">3.3/5</p>
      </div>
    </div>
  )
}

export default Metrics