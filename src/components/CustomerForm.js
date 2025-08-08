import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function CustomerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (id) {
      const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
      const customer = storedCustomers.find(c => c.id === parseInt(id, 10));
      if (customer) {
        setForm(customer);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email } = form;
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert("First name, Last name, and Email are required.");
      return;
    }

    let storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];

    if (id) {
      // Edit existing
      storedCustomers = storedCustomers.map(c =>
        c.id === parseInt(id, 10) ? { ...form, id: parseInt(id, 10) } : c
      );
    } else {
      // Add new
      const newId = storedCustomers.length > 0
        ? Math.max(...storedCustomers.map(c => c.id)) + 1
        : 1;
      storedCustomers.push({ ...form, id: newId });
    }

    localStorage.setItem('customers', JSON.stringify(storedCustomers));
    navigate('/customers');
  };

  return (
    <div className="container mt-4">
      <div className="form-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">{id ? 'Edit' : 'Add'} Customer</h3>
          <Link to="/customers" className="btn btn-secondary">&lt; Back</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {id ? 'Update' : 'Create'} Customer
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerForm;
