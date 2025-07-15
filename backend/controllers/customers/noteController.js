const asyncHandler = require('express-async-handler')

const Note = require('../../models/customers/noteModel')
const Ticket = require('../../models/customers/ticketModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get customers notes for a ticket
// @route   GET /api/customers/tickets/:ticketId/notes
// @access  Private
const getCustomerNotes = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.customer.toString() !== req.customer._id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

// @desc    Create ticket note
// @route   POST /api/customers/tickets/:ticketId/notes
// @access  Private
const addCustomerNote = asyncHandler(async (req, res) => {
  const { noteContent } = req.body

  if (!noteContent) {
    res.status(400)
    throw new Error('Please add your note')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (!ticket) {
    res.status(401)
    throw new Error('Ticket not found')
  }

  if (ticket.customer.toString() !== req.customer._id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const newNote = await Note.create({
    addedBy: req.customer.name,
    note: noteContent,
    isOwner: false,
    customer: req.customer._id,
    ticket: req.params.ticketId,
  })

  res.status(200).json(newNote)
})

module.exports = {
  getCustomerNotes,
  addCustomerNote,
}
