import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Paymenthistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    // Fetch payment history data from the backend
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/payment-history');
        setPaymentHistory(response.data);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    fetchPaymentHistory();
  }, []);

  return (
    <div className="container">
      <h2>Payment History</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer Email</th>
              <th>Amount</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment.id}>
                <td>{new Date(payment.created * 1000).toLocaleDateString()}</td>
                <td>{payment.customerEmail}</td>
                <td>{(payment.amount / 100).toFixed(2)} {payment.currency.toUpperCase()}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Paymenthistory;
