function NoteItemOwners({ note }) {
  const { note: noteContent, isOwner, createdAt, addedBy } = note

  return (
    <div
      className='note'
      style={{
        backgroundColor: isOwner ? '#803551' : '#fff',
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

export default NoteItemOwners
