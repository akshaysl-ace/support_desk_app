import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { createNewTicket, reset } from '../features/tickets/ticketSlice';

function NewTicket() {
  const { user } = useSelector(state => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.tickets,
  );
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate('/tickets');
    }
    dispatch(reset);
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createNewTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please provide below details</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input
            type='text'
            className='form-control'
            value={name}
            disabled
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            value={email}
            disabled
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={e => setProduct(e.target.value)}>
              <option value='iPhone'>iPone</option>
              <option value='iMac'>iMac</option>
              <option value='iPad'>iPad</option>
              <option value='iPod'>iPod</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='descripton'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Please type in here...'
              value={description}
              onChange={e => setDescription(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
