import React, { SyntheticEvent } from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { login, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import Spinner from "../components/Spinner";
import { StyledLogin } from "../styles/Login.styled";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  // Initialise react-router-dom hook for redirects
  const navigate = useNavigate();
  // Initialise redux hook to dispatch a function
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  // UseEffect hook detects whenever root state changes are updated
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success("Login successful");
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleOnChange = (e: SyntheticEvent) => {
    const element = e.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  };

  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <StyledLogin>
      <section className="heading">
        <h1>Login</h1>
      </section>

      <section className="form">
        <form onSubmit={handleOnSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={handleOnChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleOnChange}
          />
          <button type="submit">Login</button>
        </form>
      </section>
    </StyledLogin>
  );
};

export default Login;
