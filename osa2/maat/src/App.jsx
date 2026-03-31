import { useState, useEffect } from 'react'
import axios from 'axios'



  //hakukenttä
  const Filter = ({filter, handleFilter}) => (
    <div>
      Find countries <input value={filter} onChange={handleFilter}/>
    </div>
  )

  //listaa kun alle 10
  const TenCountries = ({countries}) => (
    <div>
      {countries.map(country => (
        <div key={country.name}>
            {country.name.common}
            <button>Show</button>
        </div>
        
      ))}
    </div>
  )

const OneCountry = ({country}) => {
  const languages = Object.values(country.languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map(lang => (
            <li key={lang}>{lang}
            </li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState('')


  // Haetaan maat palvelimelta
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

    const handleFilter = (event) => 
  { console.log(event.target.value) 
    setFilter(event.target.value) }

    const handleShow =(name) => {
      setFilter(name)
    }

    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      {filtered.length > 10 &&
       <p>Too many matches, spesify another filter</p>}
      {filtered.length <= 10 && filtered.length > 1 && (
        <TenCountries countries={filtered} handleShow={handleShow} />
      )}
      {filtered.length === 1 && (
        <OneCountry country={filtered[0]} />
      )}
    </div>
    
  )

}

export default App