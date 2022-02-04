import ContentLoader from 'react-content-loader';

const LoadingCard = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <ContentLoader
        key={i}
        speed={2}
        width={400}
        height={400}
        viewBox="0 0 400 400"
        backgroundColor="#eeeeee"
        foregroundColor="#dadada"
        style={{ borderRadius: '32px' }}
      >
        <rect x="0" y="0" rx="0" ry="0" width="400" height="300" />
        <rect x="0" y="310" rx="0" ry="0" width="400" height="20" />
        <rect x="0" y="340" rx="0" ry="0" width="400" height="20" />
        <rect x="0" y="370" rx="0" ry="0" width="400" height="20" />
      </ContentLoader>
    ))}
  </>
);

export default LoadingCard;
