import React, { useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactCard from '../components/ContactCard'
import { FaTwitter, FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa'
import emailjs from 'emailjs-com'


const Contact = () => {
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_7ajvxu8',   // from EmailJS
        'template_7zh5e3c',  // from EmailJS
        form.current,
        'DUdT901Zulmp_b2NC'    // from EmailJS (Account → Integration → Public Key)
      )
      .then(
        () => {
          alert('✅ Message sent successfully!')
          form.current.reset()
        },
        (error) => {
          console.error(error.text)
          alert('❌ Failed to send message. Try again.')
        }
      )
  }

  return (

    <div className="position-relative min-vh-100 w-100 bg-light">
      <Header />

      <div className="container py-5 min-vh-100 d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left Side */}
        <div className="text-dark mb-4 mb-md-0 col-md-5 d-flex flex-column align-items-center justify-content-center text-center">
          <h1>Contact Us</h1>
          <p className="text-muted mb-4">
            We’d love to hear from you! Whether you have questions, feedback, or business inquiries, our team is ready to help. Simply fill out the form, and we’ll respond as quickly as possible.
          </p>
          <ContactCard />
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-secondary text-white p-4 rounded shadow col-md-6 col-lg-6">
          <h3 className="fw-semibold mb-2">Contact Form</h3>
          <p className="text-light small mb-4">Fill out the form and we will get back to you soon.</p>

          <form ref={form} onSubmit={sendEmail} className="row g-3">
            <div className="col-12">
              <label className="form-label">Name</label>
              <input type="text" name="user_name" className="form-control" placeholder="Your Name" required />
            </div>
            <div className="col-12">
              <label className="form-label">Email</label>
              <input type="email" name="user_email" className="form-control" placeholder="Your Email" required />
            </div>
            <div className="col-12">
              <label className="form-label">Subject</label>
              <input type="text" name="subject" className="form-control" placeholder="Subject" />
            </div>
            <div className="col-12">
              <label className="form-label">Message</label>
              <textarea name="message" rows="4" className="form-control" placeholder="Type your message here" required></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-success w-100">Send Message</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact
