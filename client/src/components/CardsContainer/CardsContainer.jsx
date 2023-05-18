import { useState } from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = () => {
  const recipes = useSelector((state) => state.recipes);
  const groupSize = 9;
  const totalPages = Math.ceil(recipes.length / groupSize);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const renderCards = () => {
    const startIndex = currentPage * groupSize;
    const endIndex = startIndex + groupSize;
    const currentGroup = recipes.slice(startIndex, endIndex);
    return currentGroup.map((recipe) => (
      <Card
        key={recipe.id}
        title={recipe.title}
        image={recipe.image}
        diets={recipe.diets}
      />
    ));
  };


  const renderPageIndicators = () => {
    const indicators = [];

    for (let i = 0; i < totalPages; i++) {
      const indicator = (
        <span
          key={i}
          className={`${style.PageIndicator} ${
            i === currentPage ? style.Active : ""
          }`}
          onClick={() => handlePageChange(i)}
        ></span>
      );

      indicators.push(indicator);
    }

    return indicators;
  };

  return (
    <div className={style.CardsContainer}>
      <div className={style.CardGroup}>{renderCards()}</div>
      <div>
      <div className={style.Pagination}>
        {renderPageIndicators()}
      </div>
      </div>
      <div><button></button></div>
    </div>
  );
};

export default CardsContainer;