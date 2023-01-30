import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    window.localStorage.setItem("emailForRegistration", email);
    toast.success(`Email sent to ${email} for sign in`);
    setEmail("");
  };

  const registerForm = () => (
    <form className="mt-4" onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter an Email"
        autoFocus
      />

      <Button
        onClick={handleSubmit}
        type="primary"
        className="btn btn-success mt-3"
        block
        shape="round"
        size="large"
        disabled={!email}
        icon={<MailOutlined />}
      >
        Register
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="text-center">Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
