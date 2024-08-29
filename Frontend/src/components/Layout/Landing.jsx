import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../main';


const Landing = () => {

    const {isAuthorized} = useContext(Context);
    if (isAuthorized) {
        return <Navigate to='/login' />;
      }
  return (
    <section className='landing'>
    <div className='dark-overlay'>
      <div className='landing-inner'>
        <img src="./logo-white.png" alt="logo" />
        <h1 className='x-large'>Job Link</h1>
        <p className='lead'>
            Discover Your Future: Where Careers Begin. Explore, Apply, Succeed.
        </p>
        <div className='buttons'>
          <Link to='/register' className='btn btn-primary'>
            Register
          </Link>
          <Link to='/login' className='btn btn-light'>
            Login
          </Link>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Landing
