const Persons = ({persons, pattern, removefunc}) => {
  return(
    <ul>
      {persons
      .filter(person => person.name.toLowerCase().includes(pattern.toLowerCase()))
      .map(person => 
          <li key={person.id}>
            {person.name} {person.number} 
            <button key={person.id} onClick={() => {
              if (window.confirm(`Delete ${person.name} ?`)){
                removefunc(person.id)
              }
            }}>
              delete
            </button>
          </li>
          )
      }
      
    </ul>
  )
}

export default Persons