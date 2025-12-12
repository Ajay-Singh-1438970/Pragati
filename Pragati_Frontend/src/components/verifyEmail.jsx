import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
       const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify/${token}`);

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
      <Link to="/" className="btn btn-primary mt-3">Go to Login</Link>
    </div>
  );
};

export default VerifyEmail;
