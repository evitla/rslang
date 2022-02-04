export const baseTheme: ITheme = {
  fontFamily: `'Mukta', sans-serif;`,

  colors: {
    bg: 'white',
    font: 'black',
  },
};

export interface ITheme {
  fontFamily: string;

  colors: {
    bg: string;
    font: string;
  };
}
