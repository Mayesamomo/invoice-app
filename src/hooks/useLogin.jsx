import { useState } from 'react';
import API_URL from '../Api/server';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();

  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const json = await response.json();
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({
          type: 'LOGIN',
          payload: json,
        });
        navigate(from, { replace: true });
        setLoading(false);
        setError('');
      } else {
        setLoading(false);
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      if (!err.response) {
        setError('No Server Response');
      } else if (err.response.status === 400) {
        setError('Invalid Credentials');
      } else if (err.response.status === 401) {
        setError('Unauthorized');
      } else {
        setError('Login failed');
      }
    }
  };

  return { login, error, loading };
};
