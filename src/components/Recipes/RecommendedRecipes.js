import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

import { RecipesFeed } from './RecipesFeed';

import { getBaseUrl, getRecipes } from '../../hooks/useRecipes';
import { useFetch } from '../../hooks/useFetch';

import { chunkArray } from '../../utils/chunckArray';

function RecommendedRecipes({ type }) {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const { fetchData } = useFetch();

  useEffect(() => {
    getRecipes({
      fetcher: fetchData,
      recipeType: type,
      url: `${getBaseUrl(type)}/search.php?s=`,
      totalRecipes: 6,
    })
      .then((data) => setRecommendedRecipes(data));
  }, [fetchData, type]);

  const chunksOfRecommendedRecipes = chunkArray({
    arr: recommendedRecipes,
    chunkLength: 2,
  });

  return (
    <div className="carousel">
      <Carousel>
        {chunksOfRecommendedRecipes.map((chunkRecipes, index) => (
          <Carousel.Item key={ index }>
            <RecipesFeed recipes={ chunkRecipes } isRecommended />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

RecommendedRecipes.propTypes = {
  type: propTypes.string.isRequired,
};

export { RecommendedRecipes };
