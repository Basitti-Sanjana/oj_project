const express = require('express')
const router = express.Router();
const fetchuser = require('../Middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

//Route 1: Get all the notes: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
})
//Route 2: Add a new note : POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors in the validation of user returns bad request and the errors.
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const notes = new Notes({
        title, description, tag, user: req.user.id
      })
      const savedNotes = await notes.save();
      res.json(savedNotes)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
    }
  })
//Route 3: Update an existing note: put "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a new note object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    //find the note to be updated and update it.
    let notes = await Notes.findById(req.params.id);
    if (!notes) return res.status(401).send("Not Found");
    //Allow updation only if user owns this note.
    if (notes.user.toString() !== req.user.id) {
      return res.status(400).send("Not Allowed")
    }
    notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({notes});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
})
//Route 4: Delete an existing note: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    //find the note to be deleted and delete it.
    let notes = await Notes.findById(req.params.id);
    if (!notes) return res.status(401).send("Not Found");
    //Allow deletion only if user owns this note.
    if (notes.user.toString() !== req.user.id) {
      return res.status(400).send("Not Allowed");
    }
    notes = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted",notes:notes});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})
module.exports = router