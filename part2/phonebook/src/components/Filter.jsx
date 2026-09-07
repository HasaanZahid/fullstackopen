const Filter = ({pattern, onChange}) => {
  return (
    <div>
    filter shown with <input value={pattern} onChange={onChange}/>
    </div>
  )
}

export default Filter