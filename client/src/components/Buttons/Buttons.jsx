import { useState } from 'react';
import style from './Buttons.module.css';
import { useDispatch, useSelector } from "react-redux";
import { sortAZAsc, sortAZDes, sortHSAsc, sortHSDes, filterDiets, filterSource } from '../../redux/actions';

const Buttons = () => {
  const diets = useSelector((state)=>state.diets)
  const dispatch = useDispatch();
  const [isAZActive, setIsAZActive] = useState(true);
  const [isHSActive, setIsHSActive] = useState(true);
  
  const handleSortAZToggle = () => {
    setIsAZActive(!isAZActive);
    
    if (isAZActive) {
      dispatch(sortAZAsc());
    } else {
      dispatch(sortAZDes());
    }
  }

  const handleSortHSToggle = () => {
    setIsHSActive(!isHSActive);
    
    if (isHSActive) {
      dispatch(sortHSAsc());
    } else {
      dispatch(sortHSDes());
    }
  }
  const handleSourceFilter = (source) => {
      dispatch(filterSource(source));
  }
  const handleDietsFilter = (diet) => {
    dispatch(filterDiets(diet))
  }

  return (
    <>
      <div className={style.buttonBar}>
        <div><button onClick={handleSortAZToggle}>{isAZActive ? "az" : "za"}</button></div>
        <div><button onClick={handleSortHSToggle}>{isHSActive ? "+score" : "-score"}</button></div>
        <div>
          <select onChange={(event) => handleSourceFilter(event.target.value)}>
            <option value="ALL">All Sources</option>
            <option value="API">API</option>
            <option value="DB">DB</option>
          </select>
        </div>
        <div>
    <select onChange={(event) => handleDietsFilter(event.target.value)}>
      <option value="ALL">All Diets avaliables</option>
      {diets.map((diet,index) => (
        <option key={index} value={diet}>{diet}</option>
      ))}
    </select>
  </div>
      </div>
    </>
  );
};

export default Buttons;
