const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// desc - Route to get the user tickets
// route - GET -> /api/tickets
// access - private
const getTickets = asyncHandler(async (req, res) => {

    // Get user using id and jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found !");
    }

    const tickets = await Ticket.find({ user: req.user.id });
    res.status(200).json(tickets);
});


// desc - Route to get a user's ticket by ticket id
// route - GET -> /api/tickets/:id
// access - private
const getTicketById = asyncHandler(async (req, res) => {

    // Get user using id and jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found !");
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found !');
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Access denied !');
    }

    res.status(200).json(ticket);
});

// desc - Route to create a new ticket
// route - POST -> /api/tickets
// access - private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;
    if (!product || !description) {
        res.status(400);
        throw new Error("Please add a product & description !");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found !");
    }

    const ticket = await Ticket.create({
        product: product,
        description: description,
        user: req.user.id,
        status: "New"
    });

    res.status(201).json(ticket);
});

// desc - Route to delete a user's ticket by ticket id
// route - DELETE -> /api/tickets/:id
// access - private
const deleteTicketById = asyncHandler(async (req, res) => {

    // Get user using id and jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found !");
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found !');
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Access denied !');
    }

    await ticket.remove();
    res.status(200).json({ success: true });
});

// desc - Route to update a user's ticket by ticket id
// route - PUT -> /api/tickets/:id
// access - private
const updateTicketById = asyncHandler(async (req, res) => {

    // Get user using id and jwt
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found !");
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found !');
    }
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Access denied !');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTicket);
});

module.exports = {
    getTickets,
    createTicket,
    getTicketById,
    updateTicketById,
    deleteTicketById
}
