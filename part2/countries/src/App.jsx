import { useState, useEffect } from 'react'
import countryService from './services/countries'

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

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>


      <p>
        capital {country.capital?.join(', ')} 
        <br />
        area {country.area}
      </p>

      <h2>languages:</h2>

      <ul>
        {Object.values(country.languages || {}).map(language => (
          <li key={language}>
            {language}
          </li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
    </div>
  )
}

export default App