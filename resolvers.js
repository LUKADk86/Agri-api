module.exports = {
    
    Query: {
      users: (parent, args, { db }, info) => db.user.findAll(),
      user: (parent, { id }, { db }, info) => db.user.findByPk(id),
     
    },
    Mutation: {
      createUser: (parent, { email, password }, { db }, info) =>
        db.user.create({
          email: email,
          password: password
          
        }),
      updateUser: (parent, { email, password, id }, { db }, info) =>
        db.user.update({
            email: email,
            password: password
        },
        {
          where: {
            id: id
          }
        }),
      deleteUser: (parent, {id}, { db }, info) =>
        db.user.destroy({
          where: {
            id: id
          }
        })
    }
  };