import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      axios.delete(`http://localhost:3001/customers/${id}`)
        .then(() => {
          setCustomers(prev => prev.filter(c => c.id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  // Example badge generator (replace with your actual logic if you have account status, balance, etc.)
  const getStatusBadge = (email) => {
    if (email.includes('@')) {
      return <span className="badge badge-success">Verified</span>;
    }
    return <span className="badge badge-warning">Pending</span>;
  };

  return (
    <div className="container mt-4">
      <div className="table-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">Customers List</h3>
          <Link to="/customers/create" className="btn btn-secondary">
            + Create New Customer
          </Link>
        </div>

        <table className="table table-striped">
          <thead>
            <tr className="text-center">
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map(c => (
                <tr key={c.id}>
                  <td className="text-center">{c.id}</td>
                  <td>{c.firstName}</td>
                  <td>{c.lastName}</td>
                  <td>{c.email}</td>
                  <td className="text-center">{getStatusBadge(c.email)}</td>
                  <td className="text-center">
                    <Link to={`/customers/${c.id}`} className="btn btn-primary btn-sm mx-1">Show</Link>
                    <Link to={`/customers/edit/${c.id}`} className="btn btn-warning btn-sm mx-1 text-white">Edit</Link>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
