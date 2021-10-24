const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const keys = require("../keys");
const User = require("../models/user.model.js");

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login});

  if (candidate) {
    const bPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );

    if (bPasswordCorrect) {
      const token = jwt.sign(
        {
          login: candidate.login,
          userId: candidate._id,
        },
        keys.JWT,
        {expiresIn: 60 * 60}
      );
      res.json({token});
    } else {
      // для наглядности
      res.status(401).json({
        message: "Пароль неверен",
      });
      /* В реальности лучше использовать

      res.status(404).json({
        message: "Пользователь на нейден",
      });

      Это не даст взломщику информацию о том,
      что предположительно существует пользовать
      с таким логином
      */
    }
  } else {
    res.status(404).json({
      message: "Пользователь на нейден",
    });
  }
};

module.exports.createUser = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login});

  if (candidate) {
    res.status(409).json({message: "Такой Login уже занят"});
  } else {
    const salt = bcrypt.genSaltSync(10);

    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt),
    });

    await user.save();
    res.status(201).json(user);
  }
};
