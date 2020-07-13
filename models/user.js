
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING 
      },
      {
        freezeTableName: true,
      }
     
    );
  
    
  
    return User;
  }