import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Redux/actions/authActions";

const Navigation = () => {
  const { userInfo } = useSelector(state => state.auth),
    dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const toggler = () => setOpen(!open);

  const handleLogOut = () => dispatch(logOut());

  return (
    <Navbar color="dark" dark expand="md">
      <Link to="/">
        <NavbarBrand>TodoApp</NavbarBrand>
      </Link>
      <NavbarToggler onClick={toggler} />

      <Collapse navbar isOpen={open}>
        {userInfo && (
          <div className="ml-auto">
            <NavbarBrand>Welcome {userInfo?.name}</NavbarBrand>
          </div>
        )}

        <Nav className="ml-auto" navbar>
          {!userInfo ? (
            <>
              <Link to="/signin">
                <NavItem style={{ cursor: "pointer" }}>
                  <NavLink>Signin</NavLink>
                </NavItem>
              </Link>

              <Link to="/signup">
                <NavItem style={{ cursor: "pointer" }}>
                  <NavLink>Signup</NavLink>
                </NavItem>
              </Link>
            </>
          ) : (
            <NavItem style={{ cursor: "pointer" }} onClick={handleLogOut}>
              <NavLink style={{ color: "red" }}>Signout</NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigation;
