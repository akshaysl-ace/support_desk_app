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

module.exports = {
    getTickets,
    createTicket
}