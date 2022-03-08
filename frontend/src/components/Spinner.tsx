import React from "react";
import StyledSpinner from "../styles/Spinner.styled";

const Spinner = () => {
  return (
    <StyledSpinner>
      <div className="loadingSpinner"></div>
    </StyledSpinner>
  );
};

export default Spinner;
