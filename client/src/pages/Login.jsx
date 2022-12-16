import { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { user, isLoading, isSuccess, message, isError } = useSelector(
    state => state.auth,
  );

  const { email, password } = formData;

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetFormData = () => {
    setFormData({
      email: '',
      password: '',
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData));
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
          <FaSignInAlt /> Login
        </h3>
        <p>Login To Get Support</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
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
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
