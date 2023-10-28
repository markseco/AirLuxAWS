import './App.css'
import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import Layout from './Layout.jsx'; // esto esta mal
import RegisterPage from './pages/registerPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import AccountPage from './pages/AccountPage';
import PlanesPage from './pages/PlanesPage';
import PlanesForm from './components/PlanesForm';
import IndividualPlanePage from './pages/IndividualPlanePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
import FilteringPage from './pages/FilteringPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/account/planes' element={<PlanesPage />} /> 
          <Route path='/account/planes/add' element={<PlanesForm />} />
          <Route path='/account/planes/:id' element={<PlanesForm />} />  
          <Route path='/account/bookings/' element={<BookingsPage />} />
          <Route path='/account/bookings/:id' element={<BookingPage />} />
          <Route path='/plane/:id' element={<IndividualPlanePage />} />
          <Route path='/planes-filtering' element={<FilteringPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
    
  )
}

export default App
