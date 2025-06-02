import React, { useState } from 'react';
import '../assets/Css/FormValidation.css';

const Proj3 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "" });
      setErrors({});
    }
  };

  return (
    <div className="form-container">
      <h2 className="title">Form Validation App</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "input-error" : ""}
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && <span className="error-msg">{errors.phone}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Proj3;
