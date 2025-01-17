import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const searchedCountry = `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`;

const getAll = () => {
  return axios.get(baseUrl)
}

export default { 
  getAll: getAll, 
}

//https://studies.cs.helsinki.fi/restcountries/api/all
//https://studies.cs.helsinki.fi/restcountries/api/name