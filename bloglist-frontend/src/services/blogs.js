import axios from 'axios'
const baseUrl = '/api/blogs'
let token = ''

const setToken = (newToken) => (token = `Bearer ${newToken}`)

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const postBlog = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const postLike = async (id, theBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, theBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, postBlog, setToken, getOne, postLike, deleteBlog }
