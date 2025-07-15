const mongoose = require('mongoose');

const ticketHistorySchema = mongoose.Schema({
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    },
    action: {
        type: String,
        enum: ["create", "update", "assign", "comment", "close", "reopen"],
        required: true,
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    performedByType: {
        type: String,
        enum: ["owner", "customer"],
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    oldValue: String,
    newValue: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('TicketHistory', ticketHistorySchema);