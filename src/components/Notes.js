import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';
import {useNavigate} from 'react-router-dom';

function Notes() {

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log('token here');
      getNotes();
      // eslint-disable-next-line
    }
    else{
      console.log('redirecting');
      navigate('/login');
      // eslint-disable-next-line
    }
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  }

  const ref = useRef(null);
  const refClose = useRef(null);
// this is for form section
const [note, setNote] = useState({id:"",etitle:"", edescription:"", etag:""});

// this function is to handle on change function
const onChange = (e) => {
    setNote({...note, [e.target.name] : e.target.value});
}
// This is to handle the onclick function
const handleOnClick = (e) => {
  e.preventDefault();
  console.log("updating the node")
  editNote(note.id, note.etitle, note.edescription, note.etag);
  refClose.current.click();
}

  return (
    <>
      <AddNotes />

      {/* This is to update the notes */}

      <button type="button" className="btn d-none btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* the form starts from here */}
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name='etitle' value = {note.etitle} minLength={5} required aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name='edescription' value = {note.edescription} minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name='etag' value = {note.etag} minLength={5} required onChange={onChange} />
                </div>
              </form>
              {/* the form ends here */}
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleOnClick} className="btn btn-primary" disabled={note.etitle<5 || note.edescription <5}>Update Note</button>
            </div>
          </div>
        </div>
      </div>


      {/* this is container for displaying the notes */}
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className='container mx-1'>
        {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  )
}

export default Notes
