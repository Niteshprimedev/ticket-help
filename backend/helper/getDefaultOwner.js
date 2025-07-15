const Owner = require('../models/owners/ownerModel');
const bcrypt = require('bcryptjs');

async function getDefaultOwner() {
    const defaultOwner = await Owner.findOne({ isDefaultAssignee: true });
    if(defaultOwner){
        return defaultOwner;
    }

    const anyOwner = await Owner.findOne({});
    if(anyOwner){
        return anyOwner;
    };

    console.warn('No default owner found, creating a new placeholder owner');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('defaultPassword', salt);
    const placeholderOwner = new Owner({
        name: 'Support Team',
        email: 'support@tickethelp.com',
        password: hashedPassword,
        isAdmin: true,
        isActive: true,
        isDefaultAssignee: true,
    });

    await placeholderOwner.save();
    return placeholderOwner;
};

module.exports = { getDefaultOwner };