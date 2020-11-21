import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burgers-13988.firebaseio.com/'
})

export default instance
