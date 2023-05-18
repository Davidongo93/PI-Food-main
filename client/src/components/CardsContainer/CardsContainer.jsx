import { useState } from "react";
import { useSelector } from "react-redux";
import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Buttons from "../Buttons/Buttons";

const CardsContainer = () => {
  const recipes = useSelector((state) => state.recipes);
  const groupSize = 5;
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
        healthScore={recipe.healthScore}
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
      <h2>Choose your recipe</h2>
      <div className={style.CardGroup}>{renderCards()}</div>
      <div className={style.footer}>
       <div className={style.searchBar}> <SearchBar/> </div>
      <div className={style.Pagination}>
        {renderPageIndicators()}
      </div>
      <div><Buttons/></div>
      </div>
      <p>2023 Created by David Orlando Miranda</p>
    </div>
  );
};

export default CardsContainer;