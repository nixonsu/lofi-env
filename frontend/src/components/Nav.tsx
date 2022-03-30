import { Link, useNavigate } from "react-router-dom";
import { StyledNav } from "../styles/Nav.styled";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { RootState } from "../app/store";
import IconButton from "./IconButton";
import { toast } from "react-toastify";

const buttonSound = new Audio("button_sound.mp3");
buttonSound.volume = 0.2;

const Nav = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogOut = () => {
    buttonSound.play();
    toast.success("Logout successful");
    dispatch(logout());
    dispatch(reset);
    navigate("/");
  };

  const playButtonSound = () => {
    buttonSound.play();
  };

  return (
    <StyledNav>
      {user ? (
        <>
          <h1>welcome back, {user.name.toLowerCase()}</h1>
          <ul className="ul-btn">
            <li>
              <IconButton
                icon="logout"
                onClick={onLogOut}
                height={30}
                width={30}
              />
            </li>
          </ul>
        </>
      ) : (
        <ul className="ul-word-btn">
          <li>
            <Link to="/login">
              <button className="word-btn" onClick={playButtonSound}>
                Login
              </button>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <button className="word-btn" onClick={playButtonSound}>
                Register
              </button>
            </Link>
          </li>
        </ul>
      )}
    </StyledNav>
  );
};

export default Nav;
