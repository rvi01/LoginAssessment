import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("sp0715007@gmail.com");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCondeInApp: true,
    };
    try {
      await auth.sendPasswordResetEmail(email, config);
      setLoading(false);
      toast.success(`Email is sent to reset password on ${email}`);
      setEmail("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="container col-md-6 offset-md-3 p-5">
        {loading ? (
          <h4 className="text-danger">loading...</h4>
        ) : (
          <h4>Forgot Password</h4>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="mt-2 form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type your email"
            autofocus
          />
          <button className="btn btn-success mt-3" disabled={!email}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
