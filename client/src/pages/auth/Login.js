import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { MailOutlined, GoogleCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("user/history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN",
            payload: {
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              _id: res.data._id,
              token: idTokenResult.token,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);

    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN",
            payload: {
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              _id: res.data._id,
              token: idTokenResult.token,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginForm = () => (
    <form className="mt-4" onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter an Email"
        autoFocus
      />
      <input
        type="password"
        className="form-control mt-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a Password"
      />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="btn btn-success mt-3"
        block
        shape="round"
        size="large"
        disabled={!email || password.length < 6}
        icon={<MailOutlined />}
      >
        Login
      </Button>

      <Button
        onClick={googleLogin}
        type="danger"
        className="mt-3"
        block
        shape="round"
        size="large"
        icon={<GoogleCircleFilled />}
      >
        Login with Google
      </Button>

      <Link to="/forgot/password" className="float-right mt-3 text-danger">
        Forgot Password
      </Link>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-center">Login</h4>
          )}
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
