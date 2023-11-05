import useAuth from './useAuth';
import API_URL from '../Api/server';

export const useLogout = () => {
  const { dispatch } = useAuth();

  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('user');
        dispatch({
          type: 'LOGOUT',
        });
      } else if (response.status === 401) {
        console.error('Unauthorized: You are not logged in.');
      } else {
        console.error('Logout failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { logout };
};
