import api from '../../../api'

const API_URL = '/api/owners/tickets/'

// Get Ticket Feedback;
const getOwnerTicketFeedback = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.get(API_URL + ticketId + '/feedback', config)

  return response.data
}

const feedbackService = {
  getOwnerTicketFeedback,
}

export default feedbackService
