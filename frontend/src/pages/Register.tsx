import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

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
          <FaUser />
          Register
        </h1>
        <p>Create an account</p>
      </section>

      <section className="form">
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter Name"
            onChange={handleOnSubmit}
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
            placeholder="Passowrd"
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
          <button type="submit"> Submit</button>
        </form>
      </section>
    </>
  );
};

export default Register;
