export interface ITask {
  _id: string;
  text: string;
  isDone: boolean;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primaryBlack: string;
      primaryWhite: string;
      secondaryWhite: string;
    };
  }
}
