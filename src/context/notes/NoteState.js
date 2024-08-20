import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

    const host = 'http://localhost:5000'

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // To fetch all notes
    const getNotes = async () => {

        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);
    }
    // To add a note
    const addNote = async (title, description, tag,) => {

        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }
    // To delete a note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        console.log(json);

        // Logic to delete Note

        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    }
    // To edit a note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json);


    // Create a new array with updated note
    const newNotes = notes.map(note => {
        if (note._id === id) {
            return { ...note, title, description, tag };
        }
        return note;
    });

    setNotes(newNotes);
    }
    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;