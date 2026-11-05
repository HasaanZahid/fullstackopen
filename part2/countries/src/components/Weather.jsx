
import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (!city) return

    weatherService
      .getWeather(city)
      .then(response => {
        setWeather(response)
      })
  }, [city])

  if (!city) return null

  if (!weather) {
    return <p>Loading weather...</p>
  }

  return (
    <div>
      <h2>Weather in {city}</h2>

      <p>
        temperature {weather.main.temp} Celsius
      </p>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />

      <p>
        {weather.weather[0].description}
      </p>

      <p>
        wind {weather.wind.speed} m/s
      </p>
    </div>
  )
}

export default Weather
