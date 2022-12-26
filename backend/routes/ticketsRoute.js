const express = require('express');
const { getTickets, createTicket, getTicketById, deleteTicketById, updateTicketById } = require('../controllers/ticketController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

router.route('/').get(protect, getTickets).post(protect, createTicket);
router.route('/:id').get(protect, getTicketById).delete(protect, deleteTicketById).put(protect, updateTicketById);

module.exports = router;