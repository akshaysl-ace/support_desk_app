import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import NewTicket from './pages/NewTicket';
import Register from './pages/Register';
import { PrivateRoute } from './components/PrivateRoute';
import UserTickets from './pages/UserTickets';
import TicketView from './pages/TicketView';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/new-ticket' element={<PrivateRoute />}>
              <Route path='/new-ticket' element={<NewTicket />} />
            </Route>
            <Route path='/tickets' element={<PrivateRoute />}>
              <Route path='/tickets' element={<UserTickets />} />
            </Route>
            <Route path='/tickets/:ticketId' element={<PrivateRoute />}>
              <Route path='/tickets/:ticketId' element={<TicketView />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer position='top-right' />
    </>
  );
}

export default App;
