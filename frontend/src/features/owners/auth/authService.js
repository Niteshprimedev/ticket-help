import axios from 'axios'

const API_URL = '/api/owners/'

// Register user
const registerOwner = async (userData) => {
  console.log('Register owner', userData)
  const response = await axios.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('owner', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const loginOwner = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('owner', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logoutOwner = () => localStorage.removeItem('owner')

const authService = {
  registerOwner,
  loginOwner,
  logoutOwner,
}

export default authService
