const Toggle = ({label, value, onChange}) => {
  return (
    <div className="inline-flex items-center mr-4">
      <span className="mr-4 text-sm font-medium text-gray-900">{label}</span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input id="switch" type="checkbox" checked={value} onChange={onChange} className="peer sr-only"/>
        <label htmlFor="switch" className="hidden"></label>
        <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
      </label>
    </div>
  )
}

export default Toggle

    // <label className="bg-gray-700 relative w-20 h-10 rounded-full">
    //   <input type="checkbox" checked={value} onchange={onchange} classname="sr-only peer"></input>
    //   <span classname="w-2/5 h-4/5 bg-rose-300 absolute rounded-full left-1 top-1 peer-checked:bg-rose-600 peer-checked:left-11 transition-all duration-500"></span>
    //   {/* <span classname="ms-3 text-sm font-medium text-gray-900">{label}</span> */}
    // </label>