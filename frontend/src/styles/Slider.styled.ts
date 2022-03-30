import styled from "styled-components";

interface Props {
  isVertical: boolean;
}

export const StyledSlider = styled.input<Props>`
  /*Range Reset*/
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  height: 13px;
  max-width: 80px;

  /* If isVertical is true, adjust to vertical orientation */
  transform: ${({ isVertical }) =>
    isVertical === true ? "rotate(270deg)" : ""};

  /******** Chrome, Safari, Opera and Edge Chromium styles ********/
  &::-webkit-slider-runnable-track {
    height: 13px;
    background-color: ${({ theme }) => theme.colors.secondaryTextColor};
    filter: brightness(85%);
    border: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    width: 1px;
    outline: none;
    background-color: ${({ value }) =>
      value === 0 ? "transparent" : ({ theme }) => theme.colors.primaryTextColor};
    box-shadow: -80px 0 0 80px ${({ theme }) => theme.colors.primaryTextColor};
  }

  /******** Firefox styles ********/
  &::-moz-range-track {
    height: 2px;
    border: none;
    border-radius: 3px;
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    border: none;
    height: 13px;
    width: 13px;
    outline: 2px solid;
    border-radius: 50%;
    margin-top: -6px;
  }
`;
