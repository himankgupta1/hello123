import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/customers/${id}`)
      .then(res => setCustomer(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!customer) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Customer Details</h3>
        <Link to="/customers" className="btn btn-secondary">&lt; Back</Link>
      </div>

      <div className="customer-card p-4 mb-4">
        <p><strong>ID:</strong> {customer.id}</p>
        <p><strong>First Name:</strong> {customer.firstName}</p>
        <p><strong>Last Name:</strong> {customer.lastName}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
      </div>

      <h4 className="mt-4 mb-3">List of Accounts</h4>
      {customer.accounts?.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered account-table">
            <thead>
              <tr className="text-center">
                <th>Account No</th>
                <th>Type</th>
                <th>Branch</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {customer.accounts.map(acc => (
                <tr
                  key={acc.accountNo}
                  className={acc.balance < 1000 ? 'low-balance' : 'high-balance'}
                >
                  <td>{acc.accountNo}</td>
                  <td>{acc.type}</td>
                  <td>{acc.branch}</td>
                  <td>${acc.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted">No accounts found for this customer.</p>
      )}
    </div>
  );
}

export default CustomerDetails;
