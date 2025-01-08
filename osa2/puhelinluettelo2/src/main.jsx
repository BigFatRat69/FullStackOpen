import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

const promise = axios.get('http://localhost:3001/persons')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)