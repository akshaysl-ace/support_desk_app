import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    state => state.auth,
  );

  const { name, email, password, password2 } = formData;

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      password2: '',
    });
  };

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match !');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(registerUser(userData));
    }
  };

  useEffect(() => {
    // toast error popUp
    if (isError) {
      toast.error(message, { autoClose: 2000 });
      resetFormData();
    }

    // redirect when logged in
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, message, isSuccess, user, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h3>
          <FaUser /> Register
        </h3>
        <p>Please create an account for you...</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name..'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email address..'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password..'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm password..'
              required
            />
          </div>
          <div className='form-group'>
            <button
              className='btn btn-sm btn-back'
              style={{ float: 'right' }}
              onClick={resetFormData}>
              <TiDelete size={20} /> Clear data
            </button>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
