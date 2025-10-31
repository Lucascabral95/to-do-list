'use client';

import Skeleton from 'react-loading-skeleton';
import './Skeletons.scss';

const SkeletonEstructura: React.FC = () => {
  const CANTIDAD_SKELETON = 6;

  return (
    <div className="estructura-skeleton">
      {[...Array(CANTIDAD_SKELETON)].map((_, i) => (
        <div key={i} className="div-de-skeleton">
          <Skeleton className="skeleto" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonEstructura;