import axios from 'axios'

const API_URL = '/api/owners/tickets/'

// Get ticket notes
const getOwnerTicketNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + ticketId + '/notes', config)

  return response.data
}

// Create ticket note
const createOwnerTicketNote = async (noteData, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    API_URL + ticketId + '/notes',
    {
      noteContent: noteData,
    },
    config
  )

  return response.data
}

const noteService = {
  getOwnerTicketNotes,
  createOwnerTicketNote,
}

export default noteService
