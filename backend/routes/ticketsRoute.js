const express = require('express');
const { getTickets, createTicket, getTicketById, deleteTicketById, updateTicketById } = require('../controllers/ticketController');
const protect = require('../middleware/authMiddleware');
const noteRouter = require('./notesRoute');

const router = express.Router();
// re-route into note router if user hits notes related routes
router.use('/:id/notes', noteRouter);

router.route('/').get(protect, getTickets).post(protect, createTicket);
router.route('/:id').get(protect, getTicketById).delete(protect, deleteTicketById).put(protect, updateTicketById);

module.exports = router;