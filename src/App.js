import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';
import './styles.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/create" element={<CustomerForm />} />
          <Route path="/customers/edit/:id" element={<CustomerForm />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
