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
      {user ? (
        <ul className="ul-btn">
          <li>
            <IconButton icon="pixelarticons:logout" onClick={onLogOut} />
          </li>
        </ul>
      ) : (
        <ul className="ul-word-btn">
          <li>
            <Link to="/login">
              <button className="word-btn">Login</button>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <button className="word-btn">Register</button>
            </Link>
          </li>
        </ul>
      )}
    </StyledNav>
  );
};

export default Nav;
