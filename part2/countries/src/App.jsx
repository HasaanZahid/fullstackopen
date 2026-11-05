import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Country from './components/Country.jsx'

const App = () => {
  const [message, setMessage] = useState('')
  const [countryList, setCountryList] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  
  useEffect(() => {
    countryService.getAll().then(response => {
      setCountryList(response)
    })
  }, [])

  const handleChange = (event) => {
    setMessage(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countryList.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(message.toLowerCase())
  )

  return (
    <div>
      <p>
        find countries{' '}
        <input
          value={message}
          onChange={handleChange}
        />
      </p>

      {filteredCountries.length > 10 && (
        <p>
          Too many matches, specify another filter
        </p>
      )}

      {filteredCountries.length > 1 &&
       filteredCountries.length <= 10 && (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick = {() => setSelectedCountry(country)}>
                show
              </button>
            </li>
          ))}
        </ul>
      )}

      {filteredCountries.length === 1 && (
        <Country country={filteredCountries[0]} />
      )}

      {selectedCountry && (
       <Country country={selectedCountry} />
      )}

    </div>
  )
}

export default App