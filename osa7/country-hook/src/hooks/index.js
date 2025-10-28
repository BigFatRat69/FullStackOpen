import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }

    axios
      .get(`${baseUrl}${name}`)
      .then(response => {
        setCountry({ found: true, data: response.data })
      })
      .catch(() => {
        setCountry({ found: false })
      })
  }, [name])

  return country
}
