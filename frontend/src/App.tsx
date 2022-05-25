import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { DefaultTheme } from "styled-components";

function App() {
  const { colors } = useSelector((state: RootState) => state.colors);

  // Global theme name space for dashboard styles
  let theme: DefaultTheme = {
    colors: colors,
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
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
          toastStyle={{
            color: theme.colors.primaryTextColor,
            backgroundColor: theme.colors.backgroundColor,
          }}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
