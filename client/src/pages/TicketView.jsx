import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getTicketNotes, createTicketNote } from '../features/notes/noteSlice';
import Spinner from '../components/Spinner';
import BackButton from './../components/BackButton';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import NoteItem from '../components/NoteItem';
import { FaPlus } from 'react-icons/fa';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

function TicketView() {
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState('');
  const { ticket, isLoading, isError, message } = useSelector(
    state => state.tickets,
  );

  const { notes, isLoading: notesLoading } = useSelector(state => state.notes);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { ticketId } = params;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getTicketNotes(ticketId));
  }, [isError, dispatch, message, ticketId]);

  if (isLoading || notesLoading) {
    return <Spinner />;
  }

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket closed successfully !');
    navigate('/tickets');
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onNoteSubmit = e => {
    e.preventDefault();
    dispatch(createTicketNote({ text, ticketId }));
    setText('');
    closeModal();
  };

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID:- {ticket._id}
          <span className={`status status-${ticket.status?.toLowerCase()}`}>
            {ticket.status?.toUpperCase()}
          </span>
        </h2>
        <h3>Product : {ticket.product}</h3>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Ticket Description</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== 'closed' && (
        <button className='btn' onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'>
        <h2>Add Note :</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='note'
              id='note'
              className='form-control'
              placeholder='Add a note'
              value={text}
              onChange={e => setText(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map(note => (
        <NoteItem key={note.id} note={note} />
      ))}
      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default TicketView;
