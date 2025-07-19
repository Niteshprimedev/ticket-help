import api from '../../../api'

const API_URL = '/api/customers/tickets/'

// Get ticket notes
const getCustomerTicketNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.get(API_URL + ticketId + '/notes', config)

  return response.data
}

// Create ticket note
const createCustomerTicketNote = async (noteData, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await api.post(
    API_URL + ticketId + '/notes',
    {
      noteContent: noteData,
    },
    config
  )

  return response.data
}

const noteService = {
  getCustomerTicketNotes,
  createCustomerTicketNote,
}

export default noteService
