import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
       const { data } = await axios.get(`https://pragati-ifax.onrender.com/api/auth/verify/${token}`);

        setMessage(data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Verification failed.");
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div className="text-center p-5">
      <h2>{message}</h2>
      <Link to="/login" className="btn btn-primary mt-3">Go to Login</Link>
    </div>
  );
};

export default VerifyEmail;
