import { RiLock2Fill } from "react-icons/ri"; 
import { FaPhoneAlt } from "react-icons/fa"; 
import { MdOutlineMailOutline } from "react-icons/md"; 
import { FaPencilAlt } from "react-icons/fa"; 
import { FaRegUser } from "react-icons/fa"; 
import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser} = useContext(Context);

  const handleRegister = async(e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        {name, email ,password, phone, role},
        {
          withCredentials : true,
          headers : {
            "Content-Type" : "application/json",
          },
        }
      )
      toast.success(data.message);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  if(isAuthorized){
    return <Navigate to={'/home'}/>
  }


  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="/logo.png" alt="logo" />
            <h3>Create a new Account</h3>
          </div>
        <form>
          <div className="inputTag">
            <label>Register As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label>Name</label>
            <div>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><FaPencilAlt />
            </div>
          </div>
          <div className="inputTag">
            <label>Email</label>
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputTag">
            <label>Phone Number</label>
            <div>
              <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} /><FaPhoneAlt />
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><RiLock2Fill />
            </div>
          </div>
          <button type="submit" onClick={handleRegister}>Register</button>
          <Link to={'/login'}>Login Now</Link>
        </form>
        </div>
        <div className="banner">
          <img src="/register.jpg" alt="register" />
        </div>
      </div>
    </>
  )
}

export default Register
