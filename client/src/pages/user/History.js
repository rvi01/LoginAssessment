import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const History = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>User Purchase Order</h4>
        </div>
      </div>
    </div>
  );
};

export default History;
