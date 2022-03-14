import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "styled-components";

// const colours = ["#ffcc", "#ffccee", "#ffccbb", "#ffcccc"];

// Global theme name space for app styles
const theme: DefaultTheme = {
  colors: {
    primaryBlack: "black",
    primaryWhite: "#ffccbb",
    secondaryWhite: "lightgrey",
  },
};

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyles />
              <Nav />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </>
          </ThemeProvider>
        </div>
      </Router>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
