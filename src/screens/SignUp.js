import React, { useState } from 'react'
import axios from 'axios'
import {API_BASE_URL} from '../config/constant'

function SignUp() {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const alertFunction = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('')
        const alertPlaceholder = document.getElementById('alertMsg')
        alertPlaceholder.append(wrapper)
      }
  
    const signup = (event)=>{
        event.preventDefault();

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        const reqData = {
            name: fname+' '+lname,
            email: email,
            phone: phone,
            password: password
        }
        axios.post(`${API_BASE_URL}/users`, reqData, config)
        .then((response)=>{
            alertFunction('Registration successful, Please proceed to login', 'success');
            setEmail("");             
            setFname("");
            setLname("");
            setPhone("");
            setPassword("");
        })
        .catch((err)=>{
            alertFunction('Some error ocurred', 'danger');
            console.log(err);
        })
    }

  return (
    <div className='container'>
      <h3 className='text-center text-uppercase pt-4'>Create an Account</h3>
        <div id="alertMsg"></div>
        <div className='mx-auto shadow-sm rounded p-3 lh-2 text-muted contact-form-container'>
          <form onSubmit={(ev)=>signup(ev)}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">Firstname</label>
              <input value={fname} onChange={(e)=>setFname(e.target.value)} type="text" className="form-control" id="firstName" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Lastname</label>
              <input value={lname} onChange={(e)=>setLname(e.target.value)}  type="text" className="form-control" id="lastName" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Contact no.</label>
              <input value={phone} onChange={(e)=>setPhone(e.target.value)}  type="text" className="form-control" id="phone" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" className="form-control" id="email" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" className="form-control" id="password" required/>
            </div>
            <div className='d-grid'>
              <button type="submit" className="btn btn-primary">Sign up</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default SignUp