import axios from 'axios'
const baseUrl = '/api/persons'


const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)
}


const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);


export default { 
  getAll: getAll, 
  create: create, 
  update: update, 
  deletePerson: deletePerson
}