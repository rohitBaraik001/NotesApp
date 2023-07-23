const express = require('express')
const fetchUser = require('../middleware/fetchUser.js')
const Notes = require('../models/Notes.js')
const { body, validationResult } = require('express-validator');

const nrouter = express.Router();

// ROUT1: get all the notes using GET:"api/notes.js/fetchallnotes" - login required
nrouter.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        res.status(501).send({ error: err.message });
        console.log(err.message);
    }
})

// ROUT2: add notes using POST:"api/notes.js/addnote" - login required
nrouter.post('/addnote', fetchUser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter the description of length atleast 5').isLength({ min: 5 })
], async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })

        const saveNote = await notes.save();
        res.json(saveNote);
    } catch (err) {
        res.status(501).json("something went wrong");
        console.log(err.message);
    }
})

// ROUT3 : update an existing note using PUT "api/notes.js/updatenote": login required
nrouter.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create newNote object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(401).send("NOT FOUND") }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (err) {
        res.status(500).send("something went wrong");
        console.log({err:err.message});
    }
})

// ROUT4 : delete notes using DELETE "api/notes.js/deletenote" : login required
nrouter.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try{
        let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(401).send("Data not found to be deleted") }
    if (note.user.toString() != req.user.id) {
        return res.send(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    console.log("successfull deleted");
    res.json({ "success": "note has been deleted" });
    }catch(err){
        res.status(500).send("something went wrong");
        console.log({error:err.message});
    }
})

module.exports = nrouter;