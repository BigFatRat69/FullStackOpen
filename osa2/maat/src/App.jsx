import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ countryName, handleSearchChange }) => (
    <div>
        find countries: <input value={countryName} onChange={handleSearchChange} />
    </div>
);

const CountryList = ({ countries, handleShow }) => (
    <ul>
        {countries.map((country) => (
            <li key={country.name.common}>
                {country.name.common}{' '}
                <button onClick={() => handleShow(country.name.common)}>show</button>
            </li>
        ))}
    </ul>
);

const CountryDetails = ({ country }) => (
    <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
            {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
            ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
    </div>
);

const App = () => {
    const [filter, setFilter] = useState('');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then((response) => setCountries(response.data))
            .catch((error) => console.error('Error fetching countries:', error));
    }, []);

    const handleSearchChange = (event) => {
        const search = event.target.value;
        setFilter(search);

        const results = countries.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCountries(results);
    };

    const handleShow = (countryName) => {
        const country = countries.find((country) => country.name.common === countryName);
        setFilteredCountries([country]);
    };

    return (
        <div>
            <SearchBar countryName={filter} handleSearchChange={handleSearchChange} />
            {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
            {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
                <CountryList countries={filteredCountries} handleShow={handleShow} />
            )}
            {filteredCountries.length === 1 && <CountryDetails country={filteredCountries[0]} />}
        </div>
    );
};

export default App;
