import axios from 'axios'

const API_URL = '/api/customers/'

// Register user
const registerCustomer = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('customer', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const loginCustomer = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('customer', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logoutCustomer = () => localStorage.removeItem('customer')

const authService = {
  registerCustomer,
  loginCustomer,
  logoutCustomer,
}

export default authService
