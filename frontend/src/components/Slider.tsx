import { SyntheticEvent } from "react";
import { StyledSlider } from "../styles/Slider.styled";

interface Props {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: Function;
  isVertical: boolean;
}

const Slider = ({ value, min, max, step, onChange, isVertical }: Props) => {
  // event type as SyntheticEvent and event.target type as HTMLInputElement
  const handleEvent = (
    event: SyntheticEvent & { target: HTMLInputElement }
  ) => {
    onChange(Number(event.target.value));
  };
  return (
    <StyledSlider
      isVertical={isVertical}
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={handleEvent}
    />
  );
};

Slider.defaultProps = {
  value: 50,
  min: 0,
  max: 100,
  step: 1,
  isVertical: false,
};

export default Slider;
