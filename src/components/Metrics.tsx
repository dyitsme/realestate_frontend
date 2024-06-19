import SkeletonElement from './SkeletonElement'

const Metrics = ({price, safetyScore, dataLoading}) => {

  if (dataLoading) {
    return (
    <div className="grid grid-cols-1 gap-4">
      <SkeletonElement height={"h-16"}/>
      <SkeletonElement height={"h-16"} />
    </div>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col items-center border border-gray-400 rounded">
        <h2 className="">Estimated price</h2>
        <p className="text-2xl">₱ {price}</p>
      </div>
      <div className="flex flex-col items-center border border-gray-400 rounded">
        <h2 className="">Safety score</h2>
        <p className="text-2xl">{safetyScore}/8</p>
      </div>
       {/* <div className="grid grid-cols-2">
         <label>Safety</label>
         <p className="text-right">{safetyScore}/8</p>
       </div> */}
    </div>
  )
}

export default Metrics