import axios from 'axios'

const config = {
  baseURL: 'http://localhost:3000'
}

export default axios.create(config)