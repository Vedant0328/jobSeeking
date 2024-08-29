import React, { useContext, useState } from 'react'
import {Context} from "../../main";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Application = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const{isAuthorized, user} = useContext(Context);
  const navigateTo = useNavigate();

  const handleFileChange = (e) =>{
    const resume = e.target.files[0];
    setResume(resume);
  };

  const {id} = useParams();
  const handleApplication = async(e) =>{
    e.preventDefault();
    const formDate = new FormData();
    formDate.append("name", name);
    formDate.append("email", email);
    formDate.append("coverLetter", coverLetter);
    formDate.append("phone", phone);
    formDate.append("address", address);
    formDate.append("resume", resume);
    formDate.append("jobId", id);

    try {
      const {data} = await axios.post("http://localhost:4000/api/v1/application/post", formDate, {
        withCredentials : true,
        headers : {
          "Content-Type" : "multipart/form-data"
        }
      });
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigateTo('/job/getall');
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  if(!isAuthorized || (user && user.role !== "Employer")){
    navigateTo("")
  }

  return (
    <>
      <section className='application'>
        <div className="container">
          <h3>Application Form</h3>
          <form onSubmit={handleApplication}>
            <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="number" placeholder='PhoneNo' value={phone} onChange={(e) => setPhone(e.target.value)}/>
            <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}/>
            <textarea placeholder='Cover Letter' value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}/>
            <div>
              <label style={{textAlign : "start", display : "block", fontSize : '20px'}}>
                Select Resume
              </label>
              <input type="file" accept='.jpg, .png, .webp' onChange={handleFileChange} style={{width : "100%" }}/>
            </div>
            <button type='submit'>Send Application</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Application
