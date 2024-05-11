const Toggle = ({label, value, onChange}) => {
  return (
    <label className="inline-flex items-center cursor-pointer mr-8">
      <input type="checkbox" checked={value} onChange={onChange}></input>
      <span className="ms-3 text-sm font-medium text-gray-900">{label}</span>
    </label>
  )
}

export default Toggle