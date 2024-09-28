import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Custom styling for additional colors

function App() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    email: '',
    skillSet: '',
    remarks: '',
    portfolio: '',
    address: '',
    type: '',
    techStack: '',
    resume: ''
  });

  const [allUsers, setAllUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState({ id: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  const fetchAllUsers = async () => {
    try {
      const result = await axios.get('http://localhost:5000/all-details');
      setAllUsers(result.data.response);
    } catch (error) {
      toast.error('Error fetching all users: ' + error.message);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.id); 
    setFormData(user);      
  };

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/details', formData);
      toast.success('User added successfully!');
      setFormData({
        name: '',
        mobile: '',
        location: '',
        email: '',
        skillSet: '',
        remarks: '',
        portfolio: '',
        address: '',
        type: '',
        techStack: '',
        resume: ''
      }); 
      fetchAllUsers();        
    } catch (error) {
      toast.error('Error adding user: ' + error.message);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/details/${editingUser}`, formData);
      toast.success('User updated successfully!');
      setEditingUser(null);   
      setFormData({
        name: '',
        mobile: '',
        location: '',
        email: '',
        skillSet: '',
        remarks: '',
        portfolio: '',
        address: '',
        type: '',
        techStack: '',
        resume: ''
      });
      fetchAllUsers();        
    } catch (error) {
      toast.error('Error updating user: ' + error.message);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/details/${userId}`);
      toast.success('User deleted successfully!');
      fetchAllUsers();        
    } catch (error) {
      toast.error('Error deleting user: ' + error.message);
    }
  };

  const findUserById = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/details/${searchQuery.id}`);
      setAllUsers([result.data.response]);
    } catch (error) {
      toast.error('Error finding user by ID: ' + error.message);
    }
  };

  const findUserByEmail = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/details/email/${searchQuery.email}`);
      setAllUsers([result.data.response]);
    } catch (error) {
      toast.error('Error finding user by email: ' + error.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2 className="app-title">User Management Dashboard</h2>
        <p className="lead">Manage users efficiently with a vibrant and responsive UI</p>
      </div>

      {/* Add / Edit User Form */}
      <form onSubmit={editingUser ? updateUser : addNewUser} className="card p-4 shadow-lg form-section">
        <h3 className={editingUser ? 'text-warning' : 'text-success'}>{editingUser ? 'Edit User' : 'Add User'}</h3>
        <div className="row">
          {Object.keys(formData).map((key) => (
            <div className="col-md-6 mb-3" key={key}>
              <label className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type={key === 'email' ? 'email' : 'text'}
                name={key}
                value={formData[key] || ''}
                onChange={handleChange}
                className="form-control"
                required={key !== 'remarks' && key !== 'portfolio' && key !== 'resume'}
              />
            </div>
          ))}
        </div>
        <button type="submit" className={`btn ${editingUser ? 'btn-warning' : 'btn-success'} w-100`}>
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </form>

      {/* Search User by ID or Email */}
      <div className="card mt-4 p-4 shadow-lg">
        <h3 className="text-primary">Find User</h3>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Find by ID</label>
            <input
              type="text"
              name="id"
              value={searchQuery.id}
              onChange={handleSearchChange}
              className="form-control"
              placeholder="Enter ID"
            />
            <button onClick={findUserById} className="btn btn-info mt-2 w-100">Find by ID</button>
          </div>
          <div className="col-md-6 mb-3">
            <label>Find by Email</label>
            <input
              type="email"
              name="email"
              value={searchQuery.email}
              onChange={handleSearchChange}
              className="form-control"
              placeholder="Enter Email"
            />
            <button onClick={findUserByEmail} className="btn btn-info mt-2 w-100">Find by Email</button>
          </div>
        </div>
      </div>

      {/* Display All Users */}
      <div className="card mt-4 p-4 shadow-lg">
        <h3 className="text-primary">All Users</h3>
        {allUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="table table-striped table-hover user-table">
            <thead>
              <tr className="table-dark">
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Location</th>
                <th>Email</th>
                <th>Skill Set</th>
                <th>Remarks</th>
                <th>Portfolio</th>
                <th>Address</th>
                <th>Type</th>
                <th>Tech Stack</th>
                <th>Resume</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.location}</td>
                  <td>{user.email}</td>
                  <td>{user.skillSet}</td>
                  <td>{user.remarks}</td>
                  <td>{user.portfolio}</td>
                  <td>{user.address}</td>
                  <td>{user.type}</td>
                  <td>{user.techStack}</td>
                  <td>{user.resume}</td>
                  <td>
                    <button onClick={() => handleEditClick(user)} className="btn btn-secondary">
                      Edit
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger ms-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
