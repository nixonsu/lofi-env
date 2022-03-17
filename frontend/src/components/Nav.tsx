import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { StyledNav } from "../styles/Nav.styled";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { RootState } from "../app/store";
import IconButton from "./IconButton";

const Nav = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogOut = () => {
    dispatch(logout());
    dispatch(reset);
    navigate("/");
  };

  return (
    <StyledNav>
      <ul>
        {user ? (
          <li>
            <IconButton icon="pixelarticons:logout" onClick={onLogOut} />
          </li>
        ) : (
          <li>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
        )}

        {!user ? (
          <li>
            <Link to="/register">
              <FaUser /> Register
            </Link>
          </li>
        ) : null}
      </ul>
    </StyledNav>
  );
};

export default Nav;
