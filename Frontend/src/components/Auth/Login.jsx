import { RiLock2Fill } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/user/login',
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(data.message);
      setEmail('');
      setPassword('');
      setRole('');
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/home'} />;
  }

  return (
    <>
      <div className='authPage'>
        <div className='container'>
          <div className='header'>
            <img src='/logo.png' alt='logo' />
            <h3>Login to your Account</h3>
          </div>
          <form>
            <div className='inputTag'>
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value=''>Select Role</option>
                  <option value='Employer'>Employer</option>
                  <option value='Job Seeker'>Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className='inputTag'>
              <label>Email</label>
              <div>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className='inputTag'>
              <label>Password</label>
              <div>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type='submit' onClick={handleLogin}>
              Login
            </button>
            <Link to={'/register'}>Register Now</Link>
          </form>
        </div>
        <div className='banner'>
          <img src='/login.jpg' alt='login' />
        </div>
      </div>
    </>
  );
};

export default Login;
