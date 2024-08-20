import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

function Additem() {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:""});
    // this function is  to handle on submit button

    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
    }
    // this function is to handle on change function
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value});
    }
    return (
        <>
            {/* this is a container for add notes */}
            <div className="container my-3">
                <h2>Add Notes</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" value={note.title} className="form-control" id="title" name='title' aria-describedby="emailHelp" minLength={5} required  onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" value={note.description} className="form-control" id="description" name='description' minLength={5} required onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name='tag' minLength={5} required onChange={onChange} />
                    </div>
                    
                    <button disabled={note.title<5 || note.description <5} type="submit" className="btn btn-dark btn-sm" onClick={handleOnClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default Additem
