import ContentLoader from 'react-content-loader';
import { getLocalStorage } from '../../utils';
import { lightTheme, darkTheme } from '../../styles/theme';

const LoadingCard = ({ count }: { count: number }) => {
  const theme = getLocalStorage('theme');

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <ContentLoader
          key={i}
          speed={2}
          width="100%"
          height={300}
          backgroundColor={
            theme && theme === 'dark'
              ? darkTheme.colors.font + '15'
              : lightTheme.colors.font + '15'
          }
          foregroundColor={
            theme && theme === 'dark'
              ? darkTheme.colors.font + '05'
              : lightTheme.colors.font + '05'
          }
          style={{
            borderRadius: '16px',
            boxShadow: `0 0 5px 3px ${
              theme && theme === 'dark'
                ? darkTheme.colors.font + '30'
                : lightTheme.colors.font + '30'
            }`,
          }}
        >
          <rect x="0" y="0" width="30%" height="300" />
          <rect x="33%" y="24" width="25%" height="70" />
          <rect x="33%" y="114" width="45%" height="40" />
          <rect x="33%" y="174" width="35%" height="40" />
          <rect x="33%" y="234" width="120" height="40" />
          <rect x="calc(100% - 64px)" y="24" width="32" height="32" />
        </ContentLoader>
      ))}
    </>
  );
};

export default LoadingCard;
