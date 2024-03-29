import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem.js'
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getAllNotes ,editNote} = context;
  const ref = useRef('');
  const refClose=useRef('');
  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "default" });
  useEffect(() => {
      if(localStorage.getItem('token')){
        getAllNotes();
      }
      else{
        navigate('/login');
      } 
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id ,etitle: currentNote.title, edescription: currentNote.desription, etag: currentNote.tag })
  }
  const handleClick = (e) => {
    console.log("updating the note ",note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNotes showAlert={props.showAlert}/>
      <button type="button" className="btn btn-primary my-3 d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Edit Note
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button  ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <h2 className='my-3'>Your Notes</h2>
      <div className='container'>
        {notes.length===0 && 'No notes to display'}
      </div>
      <div className='row my-3'>
        {notes && notes.map((note) => {
          return <Noteitem key={note.id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>;
        })}
      </div>
    </>
  )
}

export default Notes
