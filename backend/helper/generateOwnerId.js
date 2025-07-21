const generateOwnerId = (owner) => {
  return `${owner.name} ${owner._id.toString().slice(2, 7)}`
}

module.exports = { generateOwnerId }
