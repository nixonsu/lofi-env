import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleOnChange = (e: SyntheticEvent) => {
    const element = e.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  };

  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login to your account</p>
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
            placeholder="Passowrd"
            onChange={handleOnChange}
          />
          <button type="submit"> Login</button>
        </form>
      </section>
    </>
  );
};

export default Login;
