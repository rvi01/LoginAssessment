import React, { useState } from "react";
import UserNav from "./UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("password changed");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h6 className="w-25">Your Password</h6>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control w-25"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary mt-3 w-25"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4 className="mt-3">Password Update</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
