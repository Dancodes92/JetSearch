import React from 'react';
import { useNavigate } from 'react-router-dom';
import  useAuth  from './useAuth';


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login().then(() => {
      navigate('/search');
    });
  };


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}



export default Login;

