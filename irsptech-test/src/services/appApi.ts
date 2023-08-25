import axios from 'axios'

export const urlApi = 'https://jsonplaceholder.typicode.com'

export const appApi = axios.create({
  baseURL: urlApi
})
