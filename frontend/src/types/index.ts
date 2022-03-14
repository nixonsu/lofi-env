export interface ITask {
  id: number;
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
