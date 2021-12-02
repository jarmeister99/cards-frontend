import axios from 'axios'

export const fetchCards = () => {
  return axios.get(`${process.env.REACT_APP_API_URI}/shares/`)
}
