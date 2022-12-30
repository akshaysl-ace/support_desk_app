const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");


// desc - Route to get the notes for a ticket
// route - GET -> /api/tickets/:ticketId/notes
// access - private
const getNotes = asyncHandler(async (req, res) => {
    // Get user using id and jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found !");
    }

    const ticket = await Ticket.findById(req.params.id);
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized !");
    }

    const notes = await Note.find({ ticket: req.params.id });
    res.status(200).json(notes);
});

// desc - Route to create a note on a ticket
// route - POST -> /api/tickets/:ticketId/notes
// access - private
const addNote = asyncHandler(async (req, res) => {
    // Get user using id and jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found !");
    }

    const ticket = await Ticket.findById(req.params.id);
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized !");
    }

    const note = await Note.create({
        ticket: req.params.id,
        text: req.body.text,
        isStaff: false,
        user: req.user.id
    });

    res.status(200).json(note);
});

module.exports = {
    getNotes,
    addNote
}