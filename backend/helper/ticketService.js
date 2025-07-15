const mongoose = require('mongoose');
const { selectOwnerMember } = require('./selectOwnerMember');
const Owner = require('../models/owners/ownerModel');
const Ticket = require('../models/customers/ticketModel');
// const TicketHistory = require('../models/owners/TicketHistoryModel');

async function createTicketWithAssignment(ticketData) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { product, description, customerUser, performedById, performedByType } = ticketData;

        const assignedOwner = await selectOwnerMember().select('-password');

        console.log('Assigned Owner: ', assignedOwner);

        const ticket = new Ticket({
            product,
            description,
            owner: assignedOwner._id,
            customer: customerUser._id,
            status: 'new',
        });

        await ticket.save({ session });

        await Owner.findByIdAndUpdate(
            assignedOwner._id,
            { 
                $inc: 
                { 
                activeTicketsCount: 1,
                totalAssignedTickets: 1,
                }
            },
        {session});
        
        await session.commitTransaction();
        session.endSession();
        return ticket;

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new Error(error);
    }
};

const ticketService = {
    createTicketWithAssignment,
};

module.exports = ticketService;