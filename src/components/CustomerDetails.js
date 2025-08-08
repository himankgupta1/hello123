import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    const foundCustomer = storedCustomers.find(c => String(c.id) === String(id));
    setCustomer(foundCustomer || null);
  }, [id]);

  if (!customer) {
    return (
      <div className="container mt-4">
        <p className="text-danger">Customer not found.</p>
        <Link to="/customers" className="btn btn-secondary">&larr; Back to Customers List</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4 customer-details-page">
      <Link to="/customers" className="btn btn-link mb-3">&larr; Back to Customers List</Link>

      <div className="row">
        {/* Customer Details Section */}
        <div className="col-md-5">
          <h4>Customer Details</h4>
          <div className="card p-3 shadow-sm">
            <p><strong>ID:</strong> {customer.id}</p>
            <p><strong>First Name:</strong> {customer.firstName}</p>
            <p><strong>Last Name:</strong> {customer.lastName}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone || '—'}</p>
          </div>
        </div>

        {/* List of Accounts Table */}
        <div className="col-md-7">
          <h4>List of Accounts</h4>
          {customer.accounts?.length > 0 ? (
            <div className="table-responsive shadow-sm">
              <table className="table table-bordered table-striped account-table">
                <thead className="table-header text-center">
                  <tr>
                    <th>Account No</th>
                    <th>Type</th>
                    <th>Branch</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.accounts.map(acc => (
                    <tr key={acc.accountNo} className={acc.balance < 1000 ? 'low-balance' : ''}>
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
      </div>
    </div>
  );
}

export default CustomerDetails;
