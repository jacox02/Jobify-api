module.exports = (sequalize, Sequalize) => {
  const User = sequalize.define("user", {
    User_ID: {
      type: Sequalize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    User_Name: {
      type: Sequalize.STRING(255),
    },
    User_Email: {
      type: Sequalize.STRING(255),
    },
    User_Password: {
      type: Sequalize.STRING(255),
    },
  });
  return User;
};
const getById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = ?", [pId], (err, rows) => {
      if (err) reject(err);
      resolve(rows[0]);
    });
  });
};

/*Registro de usuarios*/
const insert = ({ User_Name, User_Email, User_Password }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users ( User_Name, User_Email, User_Password) VALUES (?, ?, ?, ?)",
      [User_Name, User_Email, User_Password],
      (result) => {
        if (err) reject(err);
        if (result) {
          resolve(result);
        }
      }
    );
  });
};

/*Obtener usuarios por su Email*/
const getByEmail = (pEmail) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE User_Email = ?", [
      pEmail,
      (err, rows) => {
        if (err) reject(err);
        resolve(rows[0]);
      },
    ]);
  });
};
