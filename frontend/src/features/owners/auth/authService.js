import api from '../../../api'

const API_URL = '/api/owners/'

// Register user
const registerOwner = async (userData) => {
  const response = await api.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('owner', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const loginOwner = async (userData) => {
  const response = await api.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('owner', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logoutOwner = () => localStorage.removeItem('owner')

// Get Me user
const getMeOwner = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.get(API_URL + 'me', config)

  if (response.data) {
    localStorage.setItem('owner', JSON.stringify(response.data))
  }

  return response.data
}

// Save account details user
const saveAccountDetailsOwner = async (ownerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await api.post(API_URL + 'me/update', ownerData, config)

  if (response.data) {
    localStorage.setItem('owner', JSON.stringify(response.data))
  }

  return response.data
}

// Change Password user
const changePasswordOwner = async (ownerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.post(
    API_URL + 'me/change-password',
    ownerData,
    config
  )

  return response.data
}

const authService = {
  registerOwner,
  loginOwner,
  logoutOwner,
  getMeOwner,
  saveAccountDetailsOwner,
  changePasswordOwner,
}

export default authService
