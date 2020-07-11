import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3002',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id) {
    return apiClient.get(`/event/${id}`)
  },
  postEvent(event) {
    return apiClient.post(`/events/`, event)
  }
}
