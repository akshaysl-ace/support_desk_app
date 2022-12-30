import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import TicketItem from '../components/TicketItem';
import { getAllTicketsforUser, reset } from '../features/tickets/ticketSlice';

function UserTickets() {
  const { allTickets, isLoading, isSuccess } = useSelector(
    state => state.tickets,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset());
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getAllTicketsforUser());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <h1>All Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {allTickets.map((ticket, index) => (
          <TicketItem key={index} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default UserTickets;
