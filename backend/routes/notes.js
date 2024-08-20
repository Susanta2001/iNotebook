const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTER -1 : Get all the  notes using GET : http://localhost:5000/api/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        // const titles = notes.map(note => note.title);
        // res.json(titles);

        res.json(notes);
    } catch (error) {
        res.status(500).send({ error: "Some error occcured" });
    }
});

// ROUTER -2 : Post all the  notes using POST : http://localhost:5000/api/notes/addnote
router.post(
    "/addnote", fetchuser,
    [
        body("title").isLength({ min: 3 }),
        body("description").isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            const notes = await Note.find({ user: req.user.id });
            // send an error if post is empty
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // saving the notes
            const note = new Note({ title, description, tag, user: req.user.id });
            const savedNote = await note.save();
            // sengding response if everything is alright
            res.json(savedNote);
        } catch (error) {
            res.status(500).send({ error: "Some error occcured" });
        }
    }
);

// ROUTER - 3 : Login required. Users can edit and delete note using PUT at http://localhost:5000/api/notes/updatenote

router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    // create a newNote object to store the changed data
    try{
    const newNote = {};
    if(title) {newNote.title = title};
    if(description) {newNote.description = description};
    if(tag) {newNote.tag = tag};

    // Find the note to be updated and update it
    
    let note = await Note.findById(req.params.id);
    if(!note) {
       return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true})
    res.json({note});
} catch(error){
    res.status(500).send("Internal Server Error");
}
})

// ROUTE - 4 Login required. Users can delete their note from DELETE localhost:5000/api/notes/deletenote/:id

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try{
    // Find the note to be updated and delete it
    
    let note = await Note.findById(req.params.id);
    if(!note) {
       return res.status(404).send("Not Found");
    }
    // Allow deletion only if this note belongs to this user
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json("Success: Note has been deleted");
} catch(error){
    res.status(500).send("Internal Server Error");
}
})

module.exports = router;













