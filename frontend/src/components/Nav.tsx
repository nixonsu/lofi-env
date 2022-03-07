import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { StyledNav } from "../styles/Nav.styled";

const Nav = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </StyledNav>
  );
};

export default Nav;
