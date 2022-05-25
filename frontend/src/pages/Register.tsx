import { SyntheticEvent } from "react";
import { useState, useEffect } from "react";
import { register, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import { StyledRegister } from "../styles/Register.styled";
import Nav from "../components/Nav";

const buttonSound = new Audio("button_sound.mp3");
buttonSound.volume = 0.2;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

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
      toast.success("Registration successful");
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
    buttonSound.play();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  return (
    <>
      <Nav />
      <StyledRegister>
        <section className="heading">
          <h1>Register</h1>
        </section>

        <section className="form">
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter Name"
              onChange={handleOnChange}
            />
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
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleOnChange}
            />
            <button type="submit">Submit</button>
          </form>
        </section>
      </StyledRegister>
    </>
  );
};

export default Register;
