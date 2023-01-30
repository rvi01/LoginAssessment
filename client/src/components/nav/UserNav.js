import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/history" className="nav-link">
          History
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Password
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/wishlist" className="nav-link">
          Wishlist
        </Link>
      </li>
    </ul>
    <ul className="nav flex-column">
      <li className="nav-item">
        Education course 1
      </li>
      <li className="nav-item">
        Education course 2
      </li>
      <li className="nav-item">
        Education course 3
      </li>
    </ul>
  </nav>
);

export default UserNav;
