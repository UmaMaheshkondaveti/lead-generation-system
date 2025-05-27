import React, { useState } from 'react';
import './LeadForm.css';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email } = formData;

    if (!name || !email) {
      setStatus('Name and Email are required.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('Invalid email format.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setStatus(result.message || result.error);
    } catch {
      setStatus('Something went wrong.');
    }
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <h2>Lead Form</h2>
      <input type="text" name="name" placeholder="Name *" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email *" onChange={handleChange} required />
      <input type="text" name="company" placeholder="Company (optional)" onChange={handleChange} />
      <textarea name="message" placeholder="Message (optional)" onChange={handleChange}></textarea>
      <button type="submit">Submit</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
};

export default LeadForm;
