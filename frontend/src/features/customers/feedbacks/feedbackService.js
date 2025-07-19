import api from '../../../api'

const API_URL = '/api/customers/tickets/'

// Get ticket feedback
const getCustomerTicketFeedback = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.get(API_URL + ticketId + '/feedback', config)

  return response.data
}

const createCustomerTicketFeedback = async (feedbackData, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.post(
    API_URL + ticketId + '/feedback',
    feedbackData,
    config
  )

  return response.data
}

const feedbackService = {
  getCustomerTicketFeedback,
  createCustomerTicketFeedback,
}

export default feedbackService
