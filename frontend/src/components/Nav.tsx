import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { StyledNav } from "../styles/Nav.styled";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { RootState } from "../app/store";

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
            <button onClick={onLogOut}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
        )}

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
