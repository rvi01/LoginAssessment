import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(async () => {
    if (user && user.token) {
      await currentAdmin(user.token)
        .then((res) => {
          console.log("I am here", res);
          setOk(true);
        })
        .catch((err) => {
          console.log(err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
