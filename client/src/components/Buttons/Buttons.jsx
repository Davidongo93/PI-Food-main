//import { useState } from 'react';
import style from './Buttons.module.css';
import { useDispatch } from "react-redux";
import { sortAZAsc, sortAZDes, sortHSAsc, sortHSDes } from '../../redux/actions';

const Buttons = () => {
  const dispatch = useDispatch();
  
  const handleSortAZAsc = () => {
    dispatch(sortAZAsc());
  }

  const handleSortAZDes = () => {
    dispatch(sortAZDes());
  }

  const handleSortHSAsc = () => {
    dispatch(sortHSAsc());
  }

  const handleSortHSDes = () => {
    dispatch(sortHSDes());
  }

  return (
    <>
        <div className={style.buttonBar}>
      <div><button onClick={handleSortAZAsc}>az</button></div>
      <div><button onClick={handleSortAZDes}>za</button></div>
      <div><button onClick={handleSortHSAsc}>+score</button></div>
      <div><button onClick={handleSortHSDes}>-score</button></div>
         </div>
    </>
  );
};

export default Buttons;
