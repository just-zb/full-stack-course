import { useState,useEffect } from 'react'
import axios from 'axios'
const CountriesList=(props)=>{
  const {countries,countryFilter}=props
  const filteredCountries=countries.filter(country=>country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
  const [showCountry,setShowCountry]=useState(new Array(filteredCountries.length).fill(true))
  const showCountryFunc=(i)=>{return ()=>{
    const copy=[...showCountry]
    copy[i]=!copy[i]
    setShowCountry(copy)
  }
}
  if(filteredCountries.length>10){
    return <p>Too many matches, specify another filter</p>
  }
  if(filteredCountries.length===1){
    return <Country country={filteredCountries[0]}/>
  }
  if(filteredCountries.length>1){
    return(
      <div>
        {filteredCountries.map((country,i)=><div key={i}>
          {country.name.common} <button onClick={showCountryFunc(i)}>show</button>
          {showCountry[i] ? <Country country={country}/> : null}
          </div>)}
      </div>
    )
  }
  return <p>No countries found</p>
}
let weather = {}
const Country=(props)=>{
  const {country}=props
  const apiKey = import.meta.env.VITE_API_KEY;
  const city = country.capital[0];
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  useEffect(() => {
    axios
      .get(weather_url)
      .then(response => {
        weather = response.data
        setLoading(false)
      })
  }
  , [weather_url])
  const [loading,setLoading]=useState(true)
  
  if(loading){
    return <p>Loading weather data...</p>
  }else{
    const icon_url = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    return(
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((language,i)=><li key={i}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.name.common}/>
        <p>Weather in {country.capital[0]}</p>
        <p>temperature: {weather.main.temp-273.15} Celsius</p>
        <img src={icon_url} alt="weather icon"/>
        <p>wind: {weather.wind.speed} m/s direction {weather.wind.deg} degrees</p>
      </div>
    )
  }
}
let countries = []
const App = () => {
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        countries = response.data
      })
  }
  , [])
  const [countryFilter, setFilter] = useState('')
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return(
    <div>
      find countries <input type='text' onChange={handleFilterChange}/>
      <CountriesList countries={countries} countryFilter={countryFilter}/>
    </div>
  )
}

export default App