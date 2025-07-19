import api from '../../../api'

const API_URL = '/api/owners/tickets/'

// Create new ticket
const createOwnerTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.post(API_URL, ticketData, config)

  return response.data
}

// Get user tickets
const getOwnerTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.get(API_URL, config)

  return response.data
}

// Get user ticket
const getOwnerSingleTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.get(API_URL + ticketId, config)

  return response.data
}

// Close ticket
const closeOwnerTicket = async (ticketId, token) => {
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
  createOwnerTicket,
  getOwnerTickets,
  getOwnerSingleTicket,
  closeOwnerTicket,
}

export default ticketService
