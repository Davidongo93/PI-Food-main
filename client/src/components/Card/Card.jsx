import style from './Card.module.css'

const Card = (props) => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <p>{props.title}</p>
        <p>Health Score: {props.healthScore}</p>
        </div>
      <img className={style.img} src={props.image} alt={props.title} />
      <div className={style.list}>
      {props.diets && (
           <ul>Diet Types:
           {props.diets.map((diet, index) => (
             <li key={index}>{diet}</li>
           ))}
         </ul> 
      )}
      </div>
    </div>
  );
};

export default Card;
