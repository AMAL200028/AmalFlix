
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      setReviews(response.data);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`/api/admin/reviews/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setReviews((prev) => prev.filter((review) => review._id !== id));
      toast.success('Review deleted successfully');
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchReviews();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.name} ({user.email})</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              {review.text}
              <button onClick={() => deleteReview(review._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
