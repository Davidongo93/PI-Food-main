import { useState } from 'react';
import style from './Buttons.module.css';
import { useDispatch } from "react-redux";
import { sortAZAsc } from '../../redux/actions';

const Buttons = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(sortAZAsc());
  }

  return (
    <>
        <div className={style.buttonBar}>
      <div><button onClick={handleClick}>az</button></div>
      <div><button>za </button></div>
      <div><button>+score</button></div>
      <div><button>-score</button></div>
         </div>
    </>
  );
};

export default Buttons;
