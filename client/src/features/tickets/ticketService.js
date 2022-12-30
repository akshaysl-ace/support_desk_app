import axios from "axios";
import { API_URL_TICKET, API_URL_TICKET_BY_ID } from "../../app/constants";

const createTicketForUser = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL_TICKET, ticketData, config);
    return response.data;
}

const getTicketsForUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const ticketsResponse = await axios.get(API_URL_TICKET, config);
    return ticketsResponse.data;
}

const getTicketById = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL_TICKET_BY_ID + ticketId, config);
    return response.data;
}

const closeUserTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const data = {
        status: 'closed'
    };

    const response = await axios.put(API_URL_TICKET_BY_ID + ticketId, data, config);
    return response.data;
}

const ticketService = {
    createTicketForUser,
    getTicketsForUser,
    getTicketById,
    closeUserTicket
};

export default ticketService;