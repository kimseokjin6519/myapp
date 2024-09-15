import React, { useState } from 'react';
import './Signin.css';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch(`${backendUrl}/api/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Sign-in failed');
      const data = await response.json();
      setSuccess('Sign-in successful!');
      localStorage.setItem('token', data.token);
      setEmail('');
      setPassword('');
      setError('');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
    catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };
  
  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Sign In</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default SignIn;
