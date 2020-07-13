bcrypt =require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },{
        instanceMethods: {
          generateHash: function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
          },
          validPassword: function (password) {
            return bcrypt.compareSync(password, this.password)
          }
        }
      },
      {
        freezeTableName: true,
      }
     );
  
     
  
    return User;
  }