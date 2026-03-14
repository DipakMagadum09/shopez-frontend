import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const AdminUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users', {
          headers: { Authorization: 'Bearer ' + token }
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [token]);

  return (
    <div className="admin-page">
      <h2 style={{ color: 'white', marginBottom: '20px' }}>All Users</h2>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td style={{ color: user.userType === 'admin' ? '#e8a838' : '#aaa' }}>
                  {user.userType}
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
