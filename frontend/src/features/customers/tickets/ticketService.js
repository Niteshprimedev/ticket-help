import api from '../../../api'

const API_URL = '/api/customers/tickets/'

// Create new ticket
const createCustomerTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.post(API_URL, ticketData, config)

  return response.data
}

// Get user tickets
const getCustomerTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.get(API_URL, config)

  return response.data
}

// Get user ticket
const getCustomerSingleTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.get(API_URL + ticketId, config)

  return response.data
}

// Close ticket
const closeCustomerTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.put(
    API_URL + ticketId,
    { status: 'closed' },
    config
  )

  return response.data
}

const ticketService = {
  createCustomerTicket,
  getCustomerTickets,
  getCustomerSingleTicket,
  closeCustomerTicket,
}

export default ticketService
