import style from './Card.module.css'

const Card = (props) => {
  return (
    <div className={style.container}>
      <img src={props.image} alt="" />
      <p>Title: {props.title}</p>
      {props.diets && (
           <ul>
           {props.diets.map((diet, index) => (
             <li key={index}>{diet}</li>
           ))}
         </ul> 
      )}
    </div>
  );
};

export default Card;
