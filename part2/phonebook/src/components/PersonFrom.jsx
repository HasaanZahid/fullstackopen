const PersonForm = ({onSubmit, nameVal, numVal, nameChange, numChange}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameVal} onChange={nameChange} />
      </div>
      <div>
        number: <input value={numVal} onChange={numChange} /> 
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm