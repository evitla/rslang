import ContentLoader from 'react-content-loader';

const LoadingCard = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <ContentLoader
        key={i}
        speed={2}
        width="100%"
        height={300}
        viewBox="0 0 100% 300"
        backgroundColor="#371e0315"
        foregroundColor="#371e0305"
        style={{
          borderRadius: '16px',
          boxShadow: '0 0 10px 3px rgba(55, 30, 3, 0.2)',
        }}
      >
        <rect x="0" y="0" width="30%" height="300" />
        <rect x="33%" y="24" width="25%" height="70" />
        <rect x="33%" y="114" width="45%" height="40" />
        <rect x="33%" y="174" width="35%" height="40" />
        <rect x="33%" y="234" width="15%" height="40" />
        <rect x="calc(100% - 64px)" y="24" width="32" height="32" />
      </ContentLoader>
    ))}
  </>
);

export default LoadingCard;
