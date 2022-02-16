export const baseTheme: ITheme = {
  fontFamily: `'Montserrat', sans-serif`,

  colors: {
    bg: '#fff3e6',
    font: '#371e03',
    secondaryFont: '#828181',
    gradient: 'linear-gradient(to right, #ffaf58, #ff4141)',
  },
};

export interface ITheme {
  fontFamily: string;

  colors: {
    bg: string;
    font: string;
    secondaryFont: string;
    gradient: string;
  };
}
