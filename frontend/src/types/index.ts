export interface ITask {
  _id: string;
  text: string;
  isDone: boolean;
}

export interface IColor {
  _id: string;
  backgroundColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      backgroundColor: string;
      primaryTextColor: string;
      secondaryTextColor: string;
    };
  }
}
