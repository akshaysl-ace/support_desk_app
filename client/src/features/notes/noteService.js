import axios from "axios";
import { API_URL_TICKET_BY_ID } from "../../app/constants";

const root_url = API_URL_TICKET_BY_ID;

const getNotesForTicket = async (ticketId, token) => {

    const notes_url = root_url + ticketId + "/notes";
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const res = await axios.get(notes_url, config);
    return res.data;
}

const createNoteForTicket = async (text, ticketId, token) => {
    const notes_url = root_url + ticketId + "/notes";
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const data = {
        text: text
    }

    const res = await axios.post(notes_url, data, config);
    return res.data;
}

const noteService = {
    getNotesForTicket,
    createNoteForTicket
};

export default noteService;