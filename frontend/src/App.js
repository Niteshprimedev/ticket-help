import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import WelcomePage from './components/WelcomePage'
import AboutPage from './components/AboutPage'
import ThankYouPage from './components/ThankYouPage'

import { PrivateRoute as PrivateRouteCustomer } from './components/customers/PrivateRoute'
import Customers from './components/customers/Customers'
import HomeCustomers from './pages/customers/HomeCustomers'
import LoginCustomers from './pages/customers/LoginCustomers'
import RegisterCustomers from './pages/customers/RegisterCustomers'
import NewTicketCustomers from './pages/customers/NewTicketCustomers'
import ViewTicketCustomers from './pages/customers/ViewTicketCustomers'
import TicketPageCustomers from './pages/customers/TicketPageCustomers'
import FeedbackPageCustomers from './pages/customers/FeedbackPageCustomers'
import ReviewsPageCustomers from './pages/customers/ReviewsPageCustomers'
import AboutPageCustomers from './pages/customers/AboutPageCustomers'
import ChangePasswordCustomers from './pages/customers/ChangePasswordCustomers'

import { PrivateRoute as PrivateRouteOwner } from './components/owners/PrivateRoute'
import Owners from './components/owners/Owners'
import HomeOwners from './pages/owners/HomeOwners'
import LoginOwners from './pages/owners/LoginOwners'
import RegisterOwners from './pages/owners/RegisterOwners'
import NewTicketOwners from './pages/owners/NewTicketOwners'
import ViewTicketOwners from './pages/owners/ViewTicketOwners'
import TicketPageOwners from './pages/owners/TicketPageOwners'
import ViewProductOwners from './pages/owners/ViewProductOwners'
import AboutPageOwners from './pages/owners/AboutPageOwners'
import ChangePasswordOwners from './pages/owners/ChangePasswordOwners'

// NOTE: Here we have removed the nested routing as the path is the same

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<WelcomePage />} />
            <Route path='/about-us' element={<AboutPage />} />
            <Route
              path='/customers/about-us'
              element={<AboutPageCustomers />}
            />
            <Route path='/customers/' element={<HomeCustomers />} />
            <Route path='/customers/login' element={<LoginCustomers />} />
            <Route path='/customers/register' element={<RegisterCustomers />} />
            <Route
              path='/customers/me'
              element={
                <PrivateRouteCustomer>
                  <Customers />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path='/customers/reviews'
              element={
                <PrivateRouteCustomer>
                  <ReviewsPageCustomers />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path='/customers/new-ticket'
              element={
                <PrivateRouteCustomer>
                  <NewTicketCustomers />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path='/customers/tickets'
              element={
                <PrivateRouteCustomer>
                  <ViewTicketCustomers />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path='/customers/ticket/:ticketId'
              element={
                <PrivateRouteCustomer>
                  <TicketPageCustomers />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path='/customers/ticket/:ticketId/feedback-page'
              element={
                <PrivateRouteCustomer>
                  <FeedbackPageCustomers />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path='/customers/feedback/thank-you'
              element={
                <PrivateRouteCustomer>
                  <ThankYouPage />
                </PrivateRouteCustomer>
              }
            />
            <Route
              path='/customers/me/change-password'
              element={
                <PrivateRouteCustomer>
                  <ChangePasswordCustomers />
                </PrivateRouteCustomer>
              }
            />
            <Route path='/owners/about-us' element={<AboutPageOwners />} />
            <Route path='/owners/' element={<HomeOwners />} />
            <Route path='/owners/login' element={<LoginOwners />} />
            <Route path='/owners/register' element={<RegisterOwners />} />
            <Route
              path='/owners/me'
              element={
                <PrivateRouteOwner>
                  <Owners />
                </PrivateRouteOwner>
              }
            />
            <Route
              path='/owners/new-ticket'
              element={
                <PrivateRouteOwner>
                  <NewTicketOwners />
                </PrivateRouteOwner>
              }
            />
            <Route
              path='/owners/tickets'
              element={
                <PrivateRouteOwner>
                  <ViewTicketOwners />
                </PrivateRouteOwner>
              }
            />
            <Route
              path='/owners/ticket/:ticketId'
              element={
                <PrivateRouteOwner>
                  <TicketPageOwners />
                </PrivateRouteOwner>
              }
            />
            <Route
              path='/owners/products'
              element={
                <PrivateRouteOwner>
                  <ViewProductOwners />
                </PrivateRouteOwner>
              }
            />
            <Route
              path='/owners/me/change-password'
              element={
                <PrivateRouteOwner>
                  <ChangePasswordOwners />
                </PrivateRouteOwner>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
