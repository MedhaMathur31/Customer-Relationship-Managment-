import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuthBar = ({ onLogin }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/me', { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
        onLogin(res.data.user);
      })
      .catch(() => {
        setUser(null);
        onLogin(null);
      });
  }, [onLogin]);

  const logout = () => {
    axios.get('http://localhost:5000/auth/logout', { withCredentials: true })
      .then(() => window.location.reload());
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a href="http://localhost:5000/auth/google">
          <button style={{
            backgroundColor: '#4285F4',
            color: 'white',
            padding: '0.6rem 1.2rem',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}>
            Login with Google
          </button>
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <span>👋 Welcome, {user.displayName}</span>
      <button onClick={logout} style={{
        marginLeft: '1rem',
        backgroundColor: '#ccc',
        border: 'none',
        padding: '0.4rem 0.8rem',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Logout
      </button>
    </div>
  );
};

export default AuthBar;
