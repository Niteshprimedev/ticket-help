function NoteItemCustomers({ note }) {
  const { note: noteContent, isOwner, createdAt, addedBy } = note

  return (
    <div
      className='note'
      style={{
        backgroundColor: isOwner ? 'rgba(0,0,0,0.7)' : '#fff',
        color: isOwner ? '#fff' : '#000',
      }}
    >
      <h4>
        Note from <span>{addedBy}</span>
      </h4>
      <p>{noteContent}</p>
      <div className='note-date'>
        {new Date(createdAt).toLocaleString('en-US')}
      </div>
    </div>
  )
}

export default NoteItemCustomers
