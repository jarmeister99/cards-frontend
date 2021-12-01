import axios from 'axios'

export const fetchCards = () => {
  return axios.get('https://share.jaredfoster.dev/api/shares/')
}
