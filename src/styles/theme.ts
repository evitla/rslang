const baseTheme = {
  fontFamily: `'Montserrat', sans-serif`,
};

export const lightTheme: ITheme = {
  ...baseTheme,

  name: 'light',
  colors: {
    bg: '#fff3e6',
    font: '#371e03',
    secondaryFont: '#828181',
    gradient: 'linear-gradient(to right, #ffaf58, #ff4141)',
  },
};

export const darkTheme: ITheme = {
  ...baseTheme,

  name: 'dark',
  colors: {
    bg: '#191A19',
    font: '#fff3e6',
    secondaryFont: '#c5c5c5',
    gradient: 'linear-gradient(to right, #ffaf58, #ff4141)',
  },
};

export interface ITheme {
  fontFamily: string;
  name: string;

  colors: {
    bg: string;
    font: string;
    secondaryFont: string;
    gradient: string;
  };
}
