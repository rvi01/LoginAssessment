import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../functions/auth";
import { useDispatch } from "react-redux";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Please enter password");
    }

    if (password.length < 6) {
      toast.error("Please enter password more than 6 letters");
    } else {
      try {
        const result = await auth.signInWithEmailLink(
          email,
          window.location.href
        );

        if (result.user.emailVerified) {
          toast.success("Completing Registration");
          window.localStorage.removeItem("emailForRegistration");
          const user = auth.currentUser;
          await user.updatePassword(password);
          const idToken = user.getIdToken();
          const idTokenResult = user.getIdTokenResult();

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
            })
            .catch((err) => console.log(err));
          history.push("/home");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} className="form-control" disabled />
      <input
        type="password"
        className="form-control mt-3"
        placeholder="Enter a Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />

      <button type="submit" className="btn btn-success mt-3">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
