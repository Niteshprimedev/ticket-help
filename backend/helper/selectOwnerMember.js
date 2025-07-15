const Owner = require('../models/owners/ownerModel');
const { getDefaultOwner } = require('./getDefaultOwner');

async function selectOwnerMember() {
    try {
        const availableOwners = await Owner.find({ isActive: true }).sort({ activeTicketsCount: 1 }).limit(1);

        if(availableOwners.length > 0){
            return availableOwners[0];
        }

        return await getDefaultOwner();
    } catch (error) {
        console.log('Error selecting owner member:', error);
        return await getDefaultOwner();
    }
};

module.exports = { selectOwnerMember }