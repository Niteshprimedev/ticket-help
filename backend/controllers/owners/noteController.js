const asyncHandler = require('express-async-handler')

const Note = require('../../models/customers/noteModel')
const Ticket = require('../../models/customers/ticketModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getOwnerNotes = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (!ticket) {
    res.status(401)
    throw new Error('Ticket not found')
  }

  if (ticket.owner.toString() !== req.owner._id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addOwnerNote = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (!ticket) {
    res.status(401)
    throw new Error('Ticket not found')
  }

  if (ticket.owner.toString() !== req.owner._id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const { noteContent } = req.body

  const newNote = await Note.create({
    addedBy: req.owner.name,
    note: noteContent,
    isOwner: true,
    owner: req.owner._id,
    ticket: req.params.ticketId,
  })

  res.status(200).json(newNote)
})

module.exports = {
  getOwnerNotes,
  addOwnerNote,
}
