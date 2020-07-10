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
  getActivities() {
    return apiClient.get('/activities')
  },
  getActivity(id) {
    return apiClient.get(`/activity/${id}`)
  },
  postActivity(activity) {
    return apiClient.post(`/activities/`, activity)
  }
}
