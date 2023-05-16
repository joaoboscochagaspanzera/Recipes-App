import { useCallback, useState } from 'react';
import propTypes from 'prop-types';

import '../../styles/SkeletonImageRecipeCard.css';

function SkeletonImageRecipeCard({ src, testId, alt, width }) {
  const [showSkeleton, setShowSkeleton] = useState(true);

  const onLoadImage = useCallback(() => {
    setShowSkeleton(false);
  }, []);

  return (
    <>
      { showSkeleton && <div className="skeleton-recipe-card-img" />}
      <img
        src={ src }
        alt={ alt }
        width={ width }
        data-testid={ testId }
        onLoad={ onLoadImage }
        style={ {
          width: showSkeleton ? '0' : '100%',
        } }
      />
    </>
  );
}

SkeletonImageRecipeCard.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  testId: propTypes.string.isRequired,
  width: propTypes.number.isRequired,
};

export { SkeletonImageRecipeCard };
