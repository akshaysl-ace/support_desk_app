import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate('/');
    toast('Logged out successfully !', { autoClose: 2000 });
  };

  const getNonAuthLinks = () => {
    return (
      <>
        <li>
          <Link to='/login'>
            <FaSignInAlt />
            Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUser /> Register
          </Link>
        </li>
      </>
    );
  };

  const getAuthLinks = () => {
    return (
      <>
        <li>
          <button className='btn' onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </>
    );
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Support Desk</Link>
      </div>
      <ul>
        {user && getAuthLinks()}
        {[null, undefined].includes(user) && getNonAuthLinks()}
      </ul>
    </header>
  );
};

export default Header;
