import React, { useState, useEffect } from 'react';
import '../styles/contact.css';

const customerReviews = [
  {
    name: "Aarav Shah",
    comment: "DarkStore helped us streamline our inventory management. Highly recommended!",
  },
  {
    name: "Neha Joshi",
    comment: "User-friendly dashboard and great support team. Made our restocking 10x faster.",
  },
  {
    name: "Rahul Mehta",
    comment: "The prediction analytics are super accurate and have saved us money!",
  },
  {
    name: "Priya Kulkarni",
    comment: "Fantastic platform for managing our delivery personnel and orders efficiently.",
  }
];

const ContactPage = () => {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % customerReviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="contact-container">
      <section className="intro glass-box">
        <h1>About DarkStore Management</h1>
        <p>
          DarkStore is a cutting-edge management system tailored for optimizing warehouse and retail operations.
          It leverages AI to track inventory, process orders, and generate insights — improving speed, accuracy, and profitability.
        </p>
      </section>

      <section className="features glass-box">
        <h2>Core Features</h2>
        <ul>
          <li>AI-Powered Inventory Forecasting</li>
          <li>Real-time Warehouse & Stock Management</li>
          <li>Smart Order & Delivery Tracking</li>
          <li>Role-Based Dashboards for Admin, Warehouse, Shop & Delivery</li>
          <li>Integrated Alerts & Report System</li>
        </ul>
      </section>

      <section className="reviews glass-box">
        <h2>What Our Users Say</h2>
        <div className="slider-container">
          <div className="slider-box">
            <p>"{customerReviews[currentReview].comment}"</p>
            <span>— {customerReviews[currentReview].name}</span>
          </div>
        </div>
      </section>

      <section className="contact-details glass-box">
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:support@darkstore.com">support@darkstore.com</a></p>
        <p>Phone: <a href="tel:+918888888888">+91 88888 88888</a>, <a href="tel:+917777777777">+91 77777 77777</a></p>
        <p>Address: 401, Tech Park Avenue, Mumbai, Maharashtra, India</p>
      </section>
    </div>
  );
};

export default ContactPage;
