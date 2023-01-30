import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [state, setState] = useState("home");
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setState(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();

    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    setState("/login");
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          className="float-right"
          title={user.email && user.email.split("@")[0]} // sahil@patel.com ['sahil', 'patel']
        >
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      {!user && (
        <Item
          onClick={handleClick}
          key="register"
          icon={<UserAddOutlined />}
          className="float-right"
        >
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item
          onClick={handleClick}
          key="login"
          icon={<UserOutlined />}
          className="float-right"
        >
          <Link to="/login">Login</Link>
        </Item>
      )}
    </Menu>
  );
};

export default Header;
