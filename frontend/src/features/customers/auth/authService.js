import api from '../../../api'

const API_URL = '/api/customers/'

// Register user
const registerCustomer = async (userData) => {
  const response = await api.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('customer', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const loginCustomer = async (userData) => {
  const response = await api.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('customer', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logoutCustomer = () => localStorage.removeItem('customer')

// Get Me user
const getMeCustomer = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.get(API_URL + 'me', config)

  if (response.data) {
    localStorage.setItem('customer', JSON.stringify(response.data))
  }

  return response.data
}

// Save account details user
const saveAccountDetailsCustomer = async (customerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await api.post(API_URL + 'me/update', customerData, config)

  if (response.data) {
    localStorage.setItem('customer', JSON.stringify(response.data))
  }

  return response.data
}

// Change Password user
const changePasswordCustomer = async (customerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.post(
    API_URL + 'me/change-password',
    customerData,
    config
  )

  return response.data
}

const authService = {
  registerCustomer,
  loginCustomer,
  logoutCustomer,
  getMeCustomer,
  saveAccountDetailsCustomer,
  changePasswordCustomer,
}

export default authService
