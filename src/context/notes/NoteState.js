import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // get all notes 
    const getAllNotes = async () => {
        const response = await fetch(`${host}/api/notes.js/fetchallnotes`, { 
            method: 'GET', 
            headers: new Headers({
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            })
          });
        const json = await response.json();
         console.log(json);
        setNotes(json)
    }

    //add a note
    const addNote = async (title, description, tag) => {
        // TODO API call
        const response = await fetch(`${host}/api/notes.js/addnote`, {
            method: 'POST',
            headers: new Headers({
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            }),
            body: JSON.stringify({ title, description, tag })
        });
        // console.log("adding a new note")
        let note = await response.json();
        setNotes(notes.concat(note))
    }

    //delete a note
    const deleteNote = async(id) => {
        //TODO:API Call
        const url = `${host}/api/notes.js/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            })
        });
        const json = await response.json();
        console.log(json);
        console.log("Deleting the note with id " + id);
        const newNote = notes.filter((note) => note._id!== id );
        setNotes(newNote);
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const url = `${host}/api/notes.js/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: new Headers({
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            }),
            body: JSON.stringify({ title, description, tag })
        });
        console.log(response)
        //Logic to edit in client
        let newNotes=JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;