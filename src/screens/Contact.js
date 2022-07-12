import React from 'react'
import './Contact.css'

function Contact() {
  return (
    <div className='container'>
      <h3 className='text-center text-uppercase pt-4'>Contact us</h3>
        <div className='mx-auto shadow-sm rounded p-3 lh-2 text-muted contact-form-container'>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Fullname</label>
              <input type="text" className="form-control" id="name" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Contact no.</label>
              <input type="text" className="form-control" id="phone" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" required/>
            </div>
            <div className='mb-3'>
            <label htmlFor="timing" className="form-label">Email address</label>
              <select className="form-select" aria-label="Default select example" id='timing'>
                <option defaultValue=''>Best time to reach</option>
                <option value="M">Morning</option>
                <option value="A">Afternoon</option>
                <option value="E">Evening</option>
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor="query" className="form-label">Enter your query below</label>
              <textarea className="form-control" id='query' required></textarea>
            </div>
            <div className='d-grid'>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Contact