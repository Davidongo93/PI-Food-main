const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      allowNull:false
    
    },
    diet: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {timestamps:false}
  );
};
